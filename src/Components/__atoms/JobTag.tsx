type JobTagProps = {
  text: string;
};

function JobTag({ text }: JobTagProps) {
  return (
    <span className="bg-gray-100 text-[rgba(92,165,165,1)] font-[700] text-[16px] rounded-[4px] px-2 py-2 text-sm hover:bg-[rgba(92,165,165,1)] hover:text-[white] transition ">
      {text}
    </span>
  );
}

export default JobTag;
