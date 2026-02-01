const Footer = () => (
  <div className="bottom-0 w-full flex justify-center z-20 mt-auto bg-black">
    <footer className="bg-black/80 rounded-xl px-6 py-4 text-center text-gray-400 shadow-lg max-w-3xl w-full backdrop-blur-sm">
      <div className="border-t border-gray-700 mb-2 pt-2 space-x-1">
        <a
          href="https://github.com/holyholical/holyholical.dev/LICENSE"
          className="hover:text-white transition"
        >
          Licensing |
        </a>
        <a
          href="https://github.com/holyholical/holyholical.dev"
          className="hover:text-white transition"
        >
          Source Code |
        </a>
        <a href="/donate" className="hover:text-white transition">
          Donate
        </a>
      </div>
      <div className="text-sm mt-1">
        Except where otherwise noted, content on this site is licensed under a
        MIT license. holyholical 🄯 2026.
      </div>
    </footer>
  </div>
);

export default Footer;
