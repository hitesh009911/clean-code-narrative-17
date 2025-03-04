
import { Code, FileCode, Monitor, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const skills = [
  { name: "JavaScript/TypeScript", icon: <Code className="h-4 w-4" /> },
  { name: "React & Next.js", icon: <FileCode className="h-4 w-4" /> },
  { name: "UI/UX Design", icon: <Monitor className="h-4 w-4" /> },
  { name: "Node.js", icon: <Code className="h-4 w-4" /> },
  { name: "RESTful APIs", icon: <Code className="h-4 w-4" /> },
  { name: "PostgreSQL", icon: <FileCode className="h-4 w-4" /> },
  { name: "Tailwind CSS", icon: <FileCode className="h-4 w-4" /> },
  { name: "Git/Version Control", icon: <Code className="h-4 w-4" /> },
];

const Skills = () => {
  return (
    <div className="relative min-h-screen bg-background pt-16">
      <main className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="pt-8">
          <Button variant="ghost" asChild className="group mb-6">
            <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </Button>
        </div>
        
        <section className="py-8 md:py-16">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 md:text-4xl">Technical Expertise</h2>
            <p className="text-muted-foreground">A collection of technologies I work with to bring digital products to life.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className="skill-tag flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center shadow-sm"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  {skill.icon}
                </div>
                <h3 className="text-sm font-medium">{skill.name}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Skills;
