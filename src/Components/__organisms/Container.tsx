import { useEffect, useState } from "react";
import JobCard from "../__molecules/Jobs";
import HeaderImage from "../../assets/images/headerimg.png";

type Job = {
  id: number;
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

function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/jobs.json");
        const data = await res.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error("Error loading jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleTagClick = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
      filterJobs(newTags);
    }
  };

  const filterJobs = (tags: string[]) => {
    if (tags.length === 0) {
      setFilteredJobs(jobs);
      return;
    }

    const filtered = jobs.filter((job) => {
      const jobTags = [job.role, job.level, ...job.languages, ...job.tools];
      return tags.every((tag) => jobTags.includes(tag));
    });

    setFilteredJobs(filtered);
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setFilteredJobs(jobs);
  };

  return (
    <div className="space-y-8 ">
      <div className="relative w-full">
        <img className="w-full h-[156px] object-cover" src={HeaderImage} />
        <div className="absolute top-[110px] left-0 w-full flex justify-center">
          {selectedTags.length > 0 && (
            <div className="bg-white p-4 shadow rounded-md flex items-center gap-2 flex-wrap max-w-[1110px] w-full mx-auto">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-[rgba(92,165,165,1)] font-[700] px-2 py-1 rounded-md cursor-pointer"
                  onClick={() => {
                    const newTags = selectedTags.filter((t) => t !== tag);
                    setSelectedTags(newTags);
                    filterJobs(newTags);
                  }}
                >
                  {tag} ✕
                </span>
              ))}

              <button
                className="ml-auto text-[rgba(92,165,165,1)] font-[700] text-[16px] underline cursor-pointer"
                onClick={clearFilters}
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} onTagClick={handleTagClick} />
      ))}
    </div>
  );
}

export default JobList;
