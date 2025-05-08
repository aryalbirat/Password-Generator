import { useState, useEffect } from "react";
import { passwordService } from "../services/api";
import PasswordItem from "./PasswordItem";

function PasswordList() {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        setLoading(true);
        const response = await passwordService.getAll();
        setPasswords(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch passwords");
        setLoading(false);
      }
    };

    fetchPasswords();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this password?")) {
      try {
        await passwordService.delete(id);
        setPasswords(passwords.filter(password => password._id !== id));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete password");
      }
    }
  };

  const filteredPasswords = passwords.filter(
    password => 
      password.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (password.website && password.website.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (password.username && password.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (password.tags && password.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  if (loading) return <div className="text-center py-10">Loading...</div>;
  
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4">Your Passwords</h2>
      
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search passwords..."
          className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Password List */}
      {filteredPasswords.length === 0 ? (
        <div className="text-gray-400 text-center py-6">
          {searchTerm ? "No passwords match your search" : "No passwords saved yet"}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPasswords.map(password => (
            <PasswordItem 
              key={password._id} 
              password={password} 
              onDelete={() => handleDelete(password._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PasswordList;
