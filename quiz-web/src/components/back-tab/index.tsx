import backArrowImg from '../../assets/back-arrow.svg';
type BackTabProps = {
    text: string;
    onClick: () => void;
};

const BackTab: React.FC<BackTabProps> = ({ text, onClick }) => {
    return (
        <div className='py-2 top-0 sticky bg-white'>
            <div className="text-left ml-6 hover:cursor-pointer" onClick={onClick}>
                <img src={backArrowImg} className='align-middle absolute pt-1' alt="back-arrow" />
            </div>
            <div className="text-center font-stud-regular font-bold text-xl">{text}</div>
        </div>
    );
}

export default BackTab;