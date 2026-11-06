export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="site-container grid grid-cols-12 gap-x-6 gap-y-8 py-12">
        <div className="col-span-12 md:col-span-5">
          <p className="font-display text-lg">Charlie Bittner-Rossmiller</p>
          <p className="mt-2 text-sm text-muted">
            &copy; {new Date().getFullYear()} Charlie Bittner-Rossmiller
          </p>
        </div>
        <div className="col-span-12 md:col-span-3">
          <p className="label mb-3">Elsewhere</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://www.linkedin.com/in/charliebr/"
                target="_blank"
                rel="noopener noreferrer"
                className="link print-url"
              >
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a
                href="https://github.com/charlie-br-git"
                target="_blank"
                rel="noopener noreferrer"
                className="link print-url"
              >
                GitHub ↗
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-12 md:col-span-4">
          <p className="label mb-3">Colophon</p>
          <p className="text-sm text-muted leading-relaxed">
            Set in Fraunces and Inter. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
