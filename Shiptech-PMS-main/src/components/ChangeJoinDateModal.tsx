import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ChangeJoinDateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  currentJoinDate: string;
  onJoinDateChange: (newJoinDate: string) => void;
}

const ChangeJoinDateModal = ({
  isOpen,
  onClose,
  userId,
  currentJoinDate,
  onJoinDateChange
}: ChangeJoinDateModalProps) => {
  const [joinDate, setJoinDate] = useState(
    currentJoinDate ? new Date(currentJoinDate).toISOString().split('T')[0] : ''
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!joinDate.trim()) {
      toast.error('Please select a join date');
      return;
    }

    try {
      setLoading(true);
      const userRef = doc(db, 'users', userId);
      const newJoinDate = new Date(joinDate).toISOString();
      
      await updateDoc(userRef, {
        createdAt: newJoinDate
      });
      
      onJoinDateChange(newJoinDate);
      toast.success('Join date updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating join date:', error);
      toast.error('Failed to update join date');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Change Join Date</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Join Date
            </label>
            <input
              type="date"
              value={joinDate}
              onChange={(e) => setJoinDate(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center justify-center min-w-[80px]"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Change'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeJoinDateModal;