type PageHeaderProps = {
    title: string;
    subtitle?: string;
}
export default function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <div className="flex items-start gap-4 flex-row w-fit">
            <div className="w-[8px] bg-[#4A8AEC] rounded-[0.625rem] flex-shrink-0 self-stretch"></div>
            <div className="flex flex-col items-start justify-start">
                <h1 className="text-[2.25rem] text-[#1C304C] font-bold">{title}</h1>
                {subtitle && <p className="text-[1.25rem] text-[#2667DA]">{subtitle}</p>}
            </div>
        </div>
    );
}