import { useState, useCallback, useEffect, useRef } from "react";
import { passwordService } from "../services/api";

function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [saveData, setSaveData] = useState({
    title: "",
    website: "",
    username: "",
    tags: "",
    notes: ""
  });

  // useref
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  const handleSavePassword = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Format tags as array
      const tagsArray = saveData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
      
      await passwordService.create({
        title: saveData.title,
        password,
        website: saveData.website,
        username: saveData.username,
        notes: saveData.notes,
        tags: tagsArray,
        length,
        usedNumbers: numberAllowed,
        usedSpecialChars: charAllowed
      });
      
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setShowSaveForm(false);
        // Reset form
        setSaveData({
          title: "",
          website: "",
          username: "",
          tags: "",
          notes: ""
        });
      }, 2000);
    } catch (error) {
      console.error("Failed to save password", error);
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setSaveData({
      ...saveData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-5 px-6">
        <h1 className="text-2xl font-bold text-white text-center">Password Generator</h1>
      </div>

      {/* Password Display */}
      <div className="p-6">
        <div className="relative mb-6">
          <div className="flex rounded-lg overflow-hidden border-2 border-gray-700 focus-within:border-blue-500 transition-all duration-300">
            <input
              type="text"
              value={password}
              className="w-full bg-gray-700 text-white px-4 py-3 outline-none font-mono text-lg"
              placeholder="Your password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className={`px-4 flex items-center justify-center transition-all duration-300 ${
                copied ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {copied ? (
                <span className="text-white font-medium">Copied!</span>
              ) : (
                <span className="text-white font-medium">Copy</span>
              )}
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-5">
          {/* Length Slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-white font-medium">Password Length</label>
              <span className="text-blue-400 font-mono bg-gray-700 px-2 rounded">
                {length}
              </span>
            </div>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>6</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3 border-t border-gray-700 pt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="numberInput"
                checked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
                className="w-4 h-4 accent-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="numberInput"
                className="ml-3 text-white font-medium"
              >
                Include Numbers
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="characterInput"
                checked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
                className="w-4 h-4 accent-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="characterInput"
                className="ml-3 text-white font-medium"
              >
                Include Special Characters
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={passwordGenerator}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Generate New Password
            </button>

            <button
              onClick={() => setShowSaveForm(!showSaveForm)}
              className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {showSaveForm ? "Cancel" : "Save Password"}
            </button>
          </div>

          {/* Save Password Form */}
          {showSaveForm && (
            <div className="mt-5 pt-4 border-t border-gray-700">
              <h3 className="text-white font-medium mb-3">Save This Password</h3>
              
              {saveSuccess && (
                <div className="mb-4 bg-green-700 text-white p-3 rounded-lg text-sm">
                  Password saved successfully!
                </div>
              )}
              
              <form onSubmit={handleSavePassword} className="space-y-3">
                <div>
                  <label htmlFor="title" className="block text-gray-300 text-sm font-medium mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={saveData.title}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="e.g. Gmail Password"
                  />
                </div>
                
                <div>
                  <label htmlFor="website" className="block text-gray-300 text-sm font-medium mb-1">
                    Website
                  </label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={saveData.website}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="e.g. gmail.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="username" className="block text-gray-300 text-sm font-medium mb-1">
                    Username / Email
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={saveData.username}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="e.g. yourname@gmail.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="tags" className="block text-gray-300 text-sm font-medium mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={saveData.tags}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="e.g. email, work, personal"
                  />
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-gray-300 text-sm font-medium mb-1">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={saveData.notes}
                    onChange={handleChange}
                    rows="2"
                    className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="Additional notes..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={saving || saveSuccess}
                  className={`w-full py-2.5 font-medium rounded ${
                    saving || saveSuccess 
                      ? "bg-green-600 cursor-not-allowed" 
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white transition-colors`}
                >
                  {saving ? "Saving..." : saveSuccess ? "Saved!" : "Save Password"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
