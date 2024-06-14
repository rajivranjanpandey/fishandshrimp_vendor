import Link from "next/link";
type PageType = {
  href: string;
  name: string;
}
interface BreadcrumbProps {
  pageName: string;
  hierarchy?: PageType[];
}
const Breadcrumb = ({ pageName, hierarchy = [] }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          {
            hierarchy.map(({ href, name }, index) => {
              return (
                <li key={name}>
                  <Link className={"font-medium " + (index === hierarchy.length - 1 && " text-primary")} href={href}>
                    {` ${index === 0 ? '' : '/'} ${name}`}
                  </Link>
                </li>
              )
            })
          }
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
