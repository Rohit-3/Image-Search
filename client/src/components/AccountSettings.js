import React, { useState } from 'react';
import axios from '../api/axiosConfig';

export default function AccountSettings({ user, onDataDeleted }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    setError(null);
    
    try {
      await axios.delete('/user-data');
      setSuccess(true);
      // Wait a moment then redirect/logout
      setTimeout(() => {
        if (onDataDeleted) {
          onDataDeleted();
        }
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete account. Please try again.');
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const getPrivacyPolicyUrl = () => {
    // For production, set REACT_APP_API_URL environment variable
    // For development, use localhost
    const baseUrl = process.env.REACT_APP_API_URL || 
                    (window.location.hostname === 'localhost' ? 'http://localhost:5000' : window.location.origin);
    return `${baseUrl}/privacy`;
  };

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-100 mb-2">Account Settings</h2>
        <p className="text-sm text-slate-400">Manage your account and privacy preferences</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-slate-950/60">
          <div>
            <div className="text-sm font-medium text-slate-200">Privacy Policy</div>
            <div className="text-xs text-slate-400 mt-1">Read our privacy policy and data practices</div>
          </div>
          <a
            href={getPrivacyPolicyUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 transition-colors"
          >
            View Policy
          </a>
        </div>

        <div className="p-4 rounded-lg border border-red-500/20 bg-red-950/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-red-300">Delete Account & Data</div>
              <div className="text-xs text-slate-400 mt-1">
                Permanently delete your account and all associated data. This action cannot be undone.
              </div>
            </div>
            {!showDeleteConfirm && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 text-sm rounded-lg border border-red-500/30 bg-red-900/20 hover:bg-red-900/30 text-red-300 transition-colors"
              >
                Delete Account
              </button>
            )}
          </div>

          {showDeleteConfirm && (
            <div className="mt-4 p-4 rounded-lg border border-red-500/30 bg-red-950/20">
              <p className="text-sm text-red-200 mb-4">
                Are you sure you want to delete your account? This will permanently delete:
              </p>
              <ul className="text-xs text-slate-300 mb-4 ml-4 list-disc space-y-1">
                <li>Your user account information</li>
                <li>All your search history</li>
                <li>Any other personal data associated with your account</li>
              </ul>
              <p className="text-xs text-red-200 font-semibold mb-4">
                This action cannot be undone.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="px-4 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isDeleting ? 'Deleting...' : 'Yes, Delete My Account'}
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setError(null);
                  }}
                  disabled={isDeleting}
                  className="px-4 py-2 text-sm rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-3 p-3 rounded-lg bg-red-950/30 border border-red-500/30">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {success && (
            <div className="mt-3 p-3 rounded-lg bg-green-950/30 border border-green-500/30">
              <p className="text-sm text-green-300">
                Your account and data have been successfully deleted. Redirecting...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

