
const Skeleton = ({ className }: { className?: string }) => {
    return (
        <div
            className={`animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark ${className}`}
        />
    );
};

export default Skeleton;
