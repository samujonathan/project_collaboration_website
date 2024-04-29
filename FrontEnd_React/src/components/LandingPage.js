import React from "react";
import Link from "./ui/Link";
import Input from "./ui/Input";
import Button from "./ui/Button";

import TypingAnimation from "./ui/TypingAnimation";
import TypingBackSpacing from "./ui/TypingBackSpacing";
import AnimatedSection from "./ui/AnimatedSection";
import AnimatedList from "./ui/AnimatedList";

const LandingPage = ({ isLoggedIn }) => {
  return (
    <div className="mx-auto px-8 bg-white w-full">
      <header className="px-4 lg:px-6 h-6 flex items-center"></header>
      <main className="flex-1">
        {!isLoggedIn && (
          <section className="w-full py-12 md:py-24 lg:py-52">
            <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Welcome to the Platform
                </h1>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  The complete platform for building the Web
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 px-4 rounded-md border border-gray-500"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    className="bg-black hover:bg-black text-white py-2 px-4 rounded-md"
                    type="submit"
                    text={"Sign Up"}
                  />
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-600">
                  Sign up to get notified when we launch.&nbsp;
                  <Link
                    className="underline underline-offset-2"
                    href="#"
                    text={"Terms & Conditions"}
                  />
                </p>
              </div>
            </div>
          </section>
        )}

        {isLoggedIn && (
          <section className="w-full py-12 md:py-24 lg:py-44  ">
            <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
              <div className="space-y-5">
                <h1>
                  <TypingBackSpacing className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" />
                </h1>
                <p>
                  <TypingAnimation
                    Text="The complete platform for building the web"
                    className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
                  />
                </p>
              </div>
            </div>
          </section>
        )}

        <div className="mx-auto max-w-7xl grid gap-10 lg:gap-16 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
                The Power of Collaboration
              </h2>
              <p className="text-xl text-gray-500 dark:text-gray-500">
                Collaborating on projects has never been easier. Our platform
                provides the tools you need to work together seamlessly, whether
                you're in the same office or on the other side of the world.
                With features like task management, file sharing, and real-time
                chat, you can stay connected and productive, no matter where you
                are.
              </p>
            </div>
            {/* <div className="grid gap-4">
              <ul className="grid gap-2">
                <li>
                  <CheckIcon className="inline-block h-4 w-4" />
                  &nbsp;Easy collaboration
                </li>
                <li>
                  <CheckIcon className="inline-block h-4 w-4" />
                  &nbsp;Seamless communication
                </li>
                <li>
                  <CheckIcon className="inline-block h-4 w-4" />
                  &nbsp;Efficient project management
                </li>
                <li>
                  <CheckIcon className="inline-block h-4 w-4" />
                  &nbsp;Secure file sharing
                </li>
              </ul>
            </div> */}
            <AnimatedList />
          </div>
          <div className="flex items-center justify-center">
            <img
              alt="Collaboration illustration"
              src="/placeholder_sharing-modified.jpg"
              className="object-cover rounded-lg shadow-lg sm:rounded-xl w-full h-80"
            />
          </div>
        </div>

        {/*<section className="w-full py-12 md:py-24 lg:py-52">
        <div className="mx-auto max-w-7xl grid gap-10 lg:gap-16 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
              Featured Projects
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Explore some of the amazing projects created by our users. From
              innovative apps to inspiring art, there's something for everyone.
            </p>
          </div>
          <div className="grid gap-4">
            <Card className="p-0">
              <CardContent className="p-4">
                <div className="grid items-start gap-2">
                  <img
                    alt="Project thumbnail"
                    className="rounded-lg object-co ver"
                    height="100"
                    src="/placeholder_sharing-modified.jpg"
                    style={{
                      aspectRatio: "100/100",
                      objectFit: "cover",
                    }}
                    width="100"
                  />
                  <div className="space-y-1">
                    <h3 className="font-semibold">Project X</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      A revolutionary new product that will change the way you
                      work.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-0">
              <CardContent className="p-4">
                <div className="grid items-start gap-2">
                  <img
                    alt="Project thumbnail"
                    className="rounded-lg object-cover"
                    height="100"
                    src="/placeholder_sharing-modified.jpg"
                    style={{
                      aspectRatio: "100/100",
                      objectFit: "cover",
                    }}
                    width="100"
                  />
                  <div className="space-y-1">
                    <h3 className="font-semibold">Project Y</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      An artistic masterpiece that pushes the boundaries of
                      creativity.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </section>*/}

        <AnimatedSection />

        <section className="w-full py-8 md:py-12 lg:py-32  lg:pt-6">
          <div className="container grid items-center justify-center gap-2 px-4 text-center md:px-6 ">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                New Features
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Explore the latest features that enhance your workflow.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-3 justify-center">
              <div className="p-4 bg-gray-200 rounded-lg flex flex-col items-center justify-center">
                <h3 className="text-xl font-bold">Collaborate</h3>
                <p className="text-gray-600">
                  Make collaboration seamless with built-in code review tools.
                </p>
              </div>
              <div className="p-4 bg-gray-200 rounded-lg flex flex-col items-center justify-center">
                <h3 className="text-xl font-bold">Automation</h3>
                <p className="text-gray-600">
                  Automate your workflow with continuous integration and
                  delivery.
                </p>
              </div>
              <div className="p-4 bg-gray-200 rounded-lg flex flex-col items-center justify-center">
                <h3 className="text-xl font-bold">Scalability</h3>
                <p className="text-gray-600">
                  Scale your projects efficiently with cloud deployment options.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 VCollab Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="#"
            text={"Terms of Service"}
          />

          <Link
            className="text-xs hover:underline underline-offset-4"
            href="#"
            text={"Privacy"}
          />
        </nav>
      </footer>
    </div>
  );
};

export default LandingPage;
