import { useState } from "react";
import { passwordService } from "../services/api";

function PasswordItem({ password, onDelete }) {
  const [showPassword, setShowPassword] = useState(false);
  const [decryptedPassword, setDecryptedPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShowPassword = async () => {
    if (!decryptedPassword && !showPassword) {
      try {
        setLoading(true);
        const result = await passwordService.getById(password._id);
        setDecryptedPassword(result.data.decryptedPassword);
        setShowPassword(true);
        setLoading(false);
      } catch (error) {
        console.error("Failed to decrypt password", error);
        setLoading(false);
      }
    } else {
      setShowPassword(!showPassword);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(decryptedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors">
      <div className="flex justify-between">
        <h3 className="text-white font-medium">{password.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={onDelete}
            className="text-red-400 hover:text-red-300 focus:outline-none"
            aria-label="Delete password"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="mt-2 text-gray-300 text-sm">
        {password.website && (
          <div className="mb-1">
            <span className="text-gray-400">Website: </span>
            {password.website}
          </div>
        )}
        {password.username && (
          <div className="mb-1">
            <span className="text-gray-400">Username: </span>
            {password.username}
          </div>
        )}
      </div>

      <div className="mt-2 relative">
        <div className="flex items-center bg-gray-800 rounded-md overflow-hidden">
          <div className="flex-1 px-3 py-2 text-white font-mono text-sm overflow-x-auto">
            {loading ? (
              <span className="text-gray-400">Loading...</span>
            ) : (
              showPassword ? decryptedPassword : "••••••••••••"
            )}
          </div>
          <div className="flex">
            {showPassword && (
              <button
                onClick={copyToClipboard}
                className={`px-2 py-2 ${copied ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {copied ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                  </svg>
                )}
              </button>
            )}
            <button
              onClick={handleShowPassword}
              className="px-2 py-2 bg-gray-600 hover:bg-gray-500"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {password.tags && password.tags.map((tag, index) => (
          <span key={index} className="text-xs bg-blue-900 text-blue-200 px-2 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-2 text-xs text-gray-400">
        Created: {formatDate(password.createdAt)}
        {password.lastAccessed && (
          <span className="ml-2">
            • Last viewed: {formatDate(password.lastAccessed)}
          </span>
        )}
      </div>
    </div>
  );
}

export default PasswordItem;
