import {
  Facebook,
  Github,
  Instagram,
  InstagramIcon,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-card border-t">
      <div className="flex md:flex-row flex-col gap-8 p-8 max-w-7xl mx-auto">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">HushFeed</h2>
          <p className="text-muted-foreground mb-4">Empowering organizations with anonymous, secure voting solutions.</p>
          <p className="text-muted-foreground">
            Our platform helps teams make better decisions through transparent, 
            unbiased feedback and voting systems.
          </p>
        </div>
        
        <div className="flex-1 md:flex md:flex-col">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">How It Works</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Resources</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
          </ul>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-muted-foreground mb-2">Email: info@votesecure.com</p>
          <p className="text-muted-foreground mb-6">Phone: +1 (555) 123-4567</p>

          <div className="flex gap-4 mt-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="border-t py-6 text-center text-muted-foreground">
        &copy; {currentYear} HushFeed. All Rights Reserved
      </div>
    </footer>
  );
}
