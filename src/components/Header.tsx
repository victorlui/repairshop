import React from "react";
import { NaviButton } from "./NavButton";
import { File, HomeIcon, LogOut, UserRound } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { NavButtonMenu } from "./NavButtonMenu";

export default function Header() {
  return (
    <header className="slide bg-background h-12 p-2 border-b sticky top-0 z-20">
      <div className="flex h-8 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NaviButton href="/home" label="Home" icon={HomeIcon} />

          <Link
            href="/home"
            className="flex justify-center items-center gap-2 ml-0 "
            title="Home"
          >
            <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">
              Computer Repair Shop
            </h1>
          </Link>
        </div>

        <div className="flex items-center">
          <NaviButton href="/tickets" label="Tickets" icon={File} />
          <NavButtonMenu
            icon={UserRound}
            label="Customers Menu"
            choices={[
              { title: "Search Customers", href: "/customers" },
              { title: "New Customers", href: "/customers/form" },
            ]}
          />

          <ModeToggle />
          <Button
            variant={"ghost"}
            size={"icon"}
            aria-label="Logout"
            title="Logout"
            className="rounded-full"
            asChild
          >
            <LogoutLink>
              <LogOut />
            </LogoutLink>
          </Button>
        </div>
      </div>
    </header>
  );
}
