import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl animate-scaleIn border-2 border-cyan-200">
        <div className="flex justify-between items-center p-6 border-b-2 border-cyan-100 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-t-3xl">
          <h2 className="text-2xl font-bold text-cyan-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-cyan-600 hover:text-cyan-800 hover:bg-cyan-100 p-2 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
