// import { SidebarRoutes } from "@/app/dashboard/components/SidebarRoutes";
// import { Button } from "./ui";
// import { FaSignOutAlt } from "react-icons/fa";
// import { signOut } from "next-auth/react";
import Link from "next/link";
import { dashboardRoutes } from "@/routes/routes";
import { auth } from "@/auth.config";
import { usePathname } from "next/navigation";
import { headers } from "next/headers";
import { classNames } from "@/libs/classNames";
import ButtonSignOut from "./ButtonSignOut";

export const dynamic = "force-dynamic";

export default async function Sidebar() {
  // const pathname = usePathname();
  const heads = headers();
  const pathname = heads.get('next-url');
  const session = await auth();

  return (
    <div className="fixed top-20 w-60 h-[calc(100vh-5.4rem)] bg-slate-100 border border-primary-600 p-4 flex flex-col justify-between transition-all">
      <div className="flex flex-col w-full">
        {/* <SidebarRoutes /> */}
        {session && (
          <div>
            <ul className="flex flex-col w-full gap-y-4">
              {dashboardRoutes.map(
                (item) =>
                  item.roles.includes(session?.user.role || "") && (
                    <li key={item.text} className="list-none">
                      <Link
                        href={item.href}
                        className={classNames(
                          pathname === item.href
                            ? "bg-white text-primary-600"
                            : "text-primary-600 hover:text-white hover:bg-primary-600",
                          "group flex gap-3 rounded-xl transition-colors py-2 px4 text-base leading-6 font-bold"
                        )}
                      >
                        <item.icon
                          className="mx-4 h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        {item.text}
                      </Link>
                    </li>
                  )
              )}
              <li className="mt-8">
                <ButtonSignOut />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
