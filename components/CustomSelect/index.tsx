
import Select, { Props } from "react-select";

interface CustomSelectProps extends Props {
    className?: string;
}

const CustomSelect = ({ className, ...props }: CustomSelectProps) => {
    return (
        <Select
            {...props}
            unstyled // Use unstyled mode to rely solely on Tailwind classes
            classNames={{
                control: ({ isFocused }) =>
                    `rounded-xl border shadow-md bg-transparent px-2 py-1 flex items-center min-h-[46px] transition-colors ` +
                    (isFocused
                        ? 'border-primary'
                        : 'border-stroke dark:border-strokedark') +
                    ` dark:bg-meta-4 text-black dark:text-white`,

                menu: () =>
                    `mt-2 rounded-lg shadow-lg bg-white dark:bg-meta-4 z-50 border border-stroke dark:border-strokedark overflow-hidden`,

                menuList: () => `py-0`,

                option: ({ isFocused, isSelected }) =>
                    `cursor-pointer dark:bg-black bg-white px-4 py-2 transition-colors ` +
                    (isSelected
                        ? 'bg-primary text-white'
                        : isFocused
                            ? 'bg-gray-100 dark:bg-strokedark dark:text-white'
                            : 'text-body-color dark:text-white bg-transparent'),

                singleValue: () => `text-black dark:text-white`,
                input: () => `text-black dark:text-white`,
                placeholder: () => `text-body-color dark:text-body-color-dark`,
                dropdownIndicator: () => `text-body-color dark:text-body-color-dark p-1`,
                indicatorSeparator: () => `hidden`, // Hide separator for cleaner look
                valueContainer: () => `px-2 gap-1`,
            }}
            className={className}
        />
    );
};

export default CustomSelect;
