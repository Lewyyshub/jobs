import JobTag from "../__atoms/JobTag";

type JobCardProps = {
  job: {
    company: string;
    logo: string;
    new: boolean;
    featured: boolean;
    position: string;
    role: string;
    level: string;
    postedAt: string;
    contract: string;
    location: string;
    languages: string[];
    tools: string[];
  };
  onTagClick: (tag: string) => void;
};

function JobCard({ job, onTagClick }: JobCardProps) {
  const tags = [job.role, job.level, ...job.languages, ...job.tools];

  return (
    <div className="border-l-4 border-[rgba(92,165,165,1)] bg-white p-4 shadow rounded-md flex flex-col md:flex-row items-start md:items-center gap-4 max-w-[1110px] mx-auto">
      <img src={job.logo} alt={job.company} className="w-[88px] h-[88px]" />

      <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center w-full">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-[700] text-[rgba(92,165,165,1)] text-[18px]">
              {job.company}
            </span>
            {job.new && (
              <span className="bg-[rgba(92,165,165,1)] text-white text-xs px-2 py-1 rounded-full text-[14px] font-[700]">
                NEW!
              </span>
            )}
            {job.featured && (
              <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full font-[700]">
                FEATURED
              </span>
            )}
          </div>

          <h3 className="font-bold text-lg hover:text-[rgba(92,165,165,1)] cursor-pointer transition ">
            {job.position}
          </h3>

          <div className="text-gray-500 text-sm flex gap-2 flex-wrap">
            {job.postedAt} · {job.contract} · {job.location}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap overflow-hidden">
          {tags.map((tag) => (
            <div
              key={tag}
              className="w-[auto] h-[31px] rounded-[2px] cursor-pointer"
              onClick={() => onTagClick(tag)}
            >
              <JobTag text={tag} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobCard;
