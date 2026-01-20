function Footer() {
  const links = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "GitHub", href: "https://github.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
  ];
  return (
    <footer className="bg-gray-800 text-white py-8" data-aos="fade-up">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="hover:text-blue-400 transition"
            >
              {link.name}
            </a>
          ))}
        </div>
        <p>&copy; 2025 Smart Resume Builder. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
