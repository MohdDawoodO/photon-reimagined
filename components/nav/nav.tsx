"use client";

import { ArrowLeftIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { FaDiscord, FaGithub } from "react-icons/fa";

export default function Nav() {
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchBarRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    function scrollEvent() {
      if (!searchBarRef.current) return;
      const searchBarData = searchBarRef.current.getBoundingClientRect();

      if (searchBarData.bottom - searchBarData.height < 0) {
        setShowStickyNav(true);
      } else {
        setShowStickyNav(false);
        setIsOpen(false);
      }
    }

    window.addEventListener("scroll", scrollEvent);
    return () => window.removeEventListener("scroll", scrollEvent);
  }, []);

  function onSubmit() {
    if (searchInput.length < 3) return;
    router.push(`/search?q=${searchInput}`);
  }

  return (
    <>
      <nav className="bg-background sticky top-0 z-100 w-full">
        <div
          className={cn(
            "mx-auto flex min-h-[5vh] max-w-7xl items-center justify-between py-4",
            isOpen && "gap-2",
          )}
        >
          <Link href="/" className={cn("flex", isOpen && "hidden")}>
            <h1 className="abhaya-libre-semibold hover:text-foreground/80 text-2xl duration-300 lg:text-3xl">
              Photon
            </h1>
          </Link>
          {showStickyNav && isOpen && (
            <Button
              size="icon"
              variant="outline"
              onClick={() => setIsOpen(!isOpen)}
            >
              <ArrowLeftIcon />
            </Button>
          )}
          {showStickyNav && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className={cn(
                "hidden",
                isOpen && "flex",
                "w-full max-w-md sm:flex lg:max-w-lg",
              )}
            >
              <ButtonGroup className="w-full">
                <Input
                  placeholder="Seach for photos..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="flex-1 md:px-3 md:text-base"
                />
                <Button size="icon" type="submit">
                  <SearchIcon />
                </Button>
              </ButtonGroup>
            </form>
          )}
          <div className={cn("flex gap-2", isOpen && "hidden")}>
            {showStickyNav && (
              <Button
                size="icon-sm"
                variant="secondary"
                className="sm:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                <SearchIcon />
              </Button>
            )}
            <Link href={"https://discord.gg/SYgzNMKfm4"} target="_blank">
              <Button size="icon-sm" variant="secondary">
                <FaDiscord />
              </Button>
            </Link>
            <Link href="https://github.com/MohdDawoodO" target="_blank">
              <Button size="icon-sm" variant="secondary">
                <FaGithub />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex min-h-[30vh] items-center justify-center">
        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex flex-col items-center">
            <Link href="/">
              <h1 className="abhaya-libre-semibold hover:text-foreground/80 text-3xl duration-300 lg:text-4xl">
                Photon
              </h1>
            </Link>
            <p className="text-muted-foreground text-sm lg:text-base">
              Discover and download beautiful photos.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            ref={searchBarRef}
            className="flex w-full max-w-md justify-center lg:max-w-lg"
          >
            <ButtonGroup className="w-full">
              <Input
                placeholder="Seach for photos..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1 md:px-3 md:py-4 md:text-base lg:py-5"
              />
              <Button
                size="icon"
                type="submit"
                className="aspect-square md:py-4 lg:p-5"
              >
                <SearchIcon />
              </Button>
            </ButtonGroup>
          </form>
        </div>
      </div>
    </>
  );
}
