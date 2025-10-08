interface TrashBinButtonProps {
  onClick: () => void;
  label: string;
  imageUrl: string;
  altText: string;
  bgColorClasses: string;
}

const TrashBinButton = ({ onClick, label, imageUrl, altText, bgColorClasses }: TrashBinButtonProps) => (
  <div className="flex flex-col items-center">
    <button
      onClick={onClick}
      className={`${bgColorClasses} w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-lg transition hover:scale-105 active:scale-95`}
    >
      <img src={imageUrl} alt={altText} className="w-12 h-12 object-contain rounded-full" />
    </button>
    <p className="text-white font-medium mt-2 text-lg">{label}</p>
  </div>
);

export default TrashBinButton;