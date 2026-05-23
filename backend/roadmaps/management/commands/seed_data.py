from django.core.management.base import BaseCommand
from roadmaps.models import Career, RoadmapNode, Resource

class Command(BaseCommand):
    help = 'Seeds the database with premium careers, roadmaps, and YouTube playlists.'

    def handle(self, *args, **options):
        self.stdout.write("Cleaning existing database...")
        Resource.objects.all().delete()
        RoadmapNode.objects.all().delete()
        Career.objects.all().delete()

        self.stdout.write("Seeding new database data...")

        # --- 1. FRONTEND DEVELOPER ---
        frontend = Career.objects.create(
            title="Frontend Developer",
            description="Master the art of crafting beautiful, interactive, and responsive user interfaces. Translate design concepts into live, functional web experiences using HTML, CSS, JavaScript, and React.",
            icon="Code",
            theme_color="linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)"
        )

        nodes_fe = [
            {
                "title": "Internet & Web Fundamentals",
                "description": "Understand how the internet works, what HTTP/HTTPS is, hosting, DNS, and browser rendering. Then, master the structural foundation of the web with semantic HTML5 and styling layouts with modern CSS3 (Flexbox, Grid, Custom Properties).",
                "order": 1,
                "difficulty": "Beginner",
                "duration": "1-2 weeks",
                "resources": [
                    {
                        "title": "HTML & CSS Tutorial for Beginners",
                        "url": "https://www.youtube.com/playlist?list=PL4Gr5tOAP1tbBsnJgB5L6_l63H1vS9168",
                        "resource_type": "youtube_playlist",
                        "duration": "6 hours"
                    }
                ]
            },
            {
                "title": "JavaScript Essentials",
                "description": "Learn the core scripting language of the web. Focus on variables, data types, control structures, functions, DOM manipulation, events, asynchronous programming (Promises, async/await), and modern ES6+ features.",
                "order": 2,
                "difficulty": "Beginner",
                "duration": "2-3 weeks",
                "resources": [
                    {
                        "title": "JavaScript Tutorial for Beginners",
                        "url": "https://www.youtube.com/playlist?list=PLTjRvDozrdlxEIuOBZkMAK5ui56YfSZhy",
                        "resource_type": "youtube_playlist",
                        "duration": "14 hours"
                    }
                ]
            },
            {
                "title": "Git & Version Control",
                "description": "Master version control to track project history, collaborate with other developers via GitHub, resolve merge conflicts, and manage feature branching and pull requests.",
                "order": 3,
                "difficulty": "Beginner",
                "duration": "1 week",
                "resources": [
                    {
                        "title": "Git and GitHub Crash Course",
                        "url": "https://www.youtube.com/playlist?list=PL82C6-O45EGFs586_Rz8jQJp5ZcKzD4sD",
                        "resource_type": "youtube_playlist",
                        "duration": "3 hours"
                    }
                ]
            },
            {
                "title": "React.js Framework",
                "description": "Dive into the most popular component-based UI library. Master JSX, components (props, state), hooks (useState, useEffect, useContext), dynamic routing, and handling API integration.",
                "order": 4,
                "difficulty": "Intermediate",
                "duration": "3-4 weeks",
                "resources": [
                    {
                        "title": "ReactJS Course for Beginners",
                        "url": "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISMCGpG5d",
                        "resource_type": "youtube_playlist",
                        "duration": "8 hours"
                    }
                ]
            },
            {
                "title": "Tailwind CSS & Styling Systems",
                "description": "Learn how to build production-ready layouts with hyper-speed using utility-first styling. Build consistent design tokens, dark themes, and responsive design natively.",
                "order": 5,
                "difficulty": "Intermediate",
                "duration": "1 week",
                "resources": [
                    {
                        "title": "Tailwind CSS Course",
                        "url": "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gpXORlEHliQsNyslK8y16v",
                        "resource_type": "youtube_playlist",
                        "duration": "4 hours"
                    }
                ]
            },
            {
                "title": "Build Tools & Web Performance",
                "description": "Explore compilation, bundling, and hot reloading using Vite and npm packages. Learn optimization strategies like lazy loading, image compressing, and network request reductions.",
                "order": 6,
                "difficulty": "Advanced",
                "duration": "2 weeks",
                "resources": [
                    {
                        "title": "Vite & Modern Frontend Tooling",
                        "url": "https://www.youtube.com/playlist?list=PL4cUxeGkcC9h2HlFfM5o4p7X1s8-o-j6s",
                        "resource_type": "youtube_playlist",
                        "duration": "3 hours"
                    }
                ]
            }
        ]

        # --- 2. BACKEND DEVELOPER ---
        backend = Career.objects.create(
            title="Backend Developer",
            description="Construct the engine that powers modern applications. Design database architectures, engineer secure high-performance REST APIs, build robust caching mechanisms, and deploy servers to the cloud.",
            icon="Database",
            theme_color="linear-gradient(135deg, #10b981 0%, #059669 100%)"
        )

        nodes_be = [
            {
                "title": "Python & Backend Fundamentals",
                "description": "Learn a robust programming language used in backend architectures. Master OOP, basic algorithms, package managers (pip/uv), data structures, and file systems.",
                "order": 1,
                "difficulty": "Beginner",
                "duration": "2-3 weeks",
                "resources": [
                    {
                        "title": "Python Programming Course",
                        "url": "https://www.youtube.com/playlist?list=PLTjRvDozrdlxj5wgH4qkvwSOdHLOCx10f",
                        "resource_type": "youtube_playlist",
                        "duration": "12 hours"
                    }
                ]
            },
            {
                "title": "Relational Databases & SQL",
                "description": "Understand how structured data is stored, indexed, and retrieved. Learn standard SQL queries, schemas, keys, constraints, table joints, and basic optimization tricks with SQLite or PostgreSQL.",
                "order": 2,
                "difficulty": "Beginner",
                "duration": "2 weeks",
                "resources": [
                    {
                        "title": "SQL and Database Design Course",
                        "url": "https://www.youtube.com/playlist?list=PL0gIV7t4l35LoW012S4k85x_b_8Z3E-j9",
                        "resource_type": "youtube_playlist",
                        "duration": "5 hours"
                    }
                ]
            },
            {
                "title": "Django & Web Frameworks",
                "description": "Learn a powerful batteries-included framework. Master Model-View-Template pattern, migrations, the Django ORM, authentication, admin panel, and template engines.",
                "order": 3,
                "difficulty": "Intermediate",
                "duration": "3 weeks",
                "resources": [
                    {
                        "title": "Django Tutorial for Beginners",
                        "url": "https://www.youtube.com/playlist?list=PL-51W-CZuUglxqL2T_XhZ9k5b45gXfKjA",
                        "resource_type": "youtube_playlist",
                        "duration": "10 hours"
                    }
                ]
            },
            {
                "title": "RESTful API Engineering",
                "description": "Master REST architecture, HTTP methods, headers, status codes, serialization, JWT authentication, and pagination using the Django REST Framework (DRF).",
                "order": 4,
                "difficulty": "Intermediate",
                "duration": "2 weeks",
                "resources": [
                    {
                        "title": "Django REST Framework Course",
                        "url": "https://www.youtube.com/playlist?list=PL-51W-CZuUglFk4O5k0Vz4QdFf9bOa_L3",
                        "resource_type": "youtube_playlist",
                        "duration": "8 hours"
                    }
                ]
            },
            {
                "title": "Caching & Message Queues",
                "description": "Drastically speed up API response times by setting up Redis caching. Manage complex asynchronous tasks in the background using Celery and message brokers.",
                "order": 5,
                "difficulty": "Advanced",
                "duration": "2 weeks",
                "resources": [
                    {
                        "title": "Redis & Caching Architectures",
                        "url": "https://www.youtube.com/playlist?list=PL4cUxeGkcC9hHG1Kk2Wd03Hsd_CAnPsmc",
                        "resource_type": "youtube_playlist",
                        "duration": "4 hours"
                    }
                ]
            }
        ]

        # --- 3. DEVOPS ENGINEER ---
        devops = Career.objects.create(
            title="DevOps Engineer",
            description="Bridge the gap between coding and production. Automate deployments, construct rapid CI/CD build channels, orchestrate cloud infrastructure, and supervise application health at scale.",
            icon="Server",
            theme_color="linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)"
        )

        nodes_do = [
            {
                "title": "Linux Administration & Terminal",
                "description": "Master the Linux command line (CLI), filesystems, user permissions, networking tools, process management, and simple shell/Bash scripting for automated tasks.",
                "order": 1,
                "difficulty": "Beginner",
                "duration": "2 weeks",
                "resources": [
                    {
                        "title": "Linux CLI Course for Beginners",
                        "url": "https://www.youtube.com/playlist?list=PLtK75qoxnQOS7K_0Xn425E4wL5E05u5hU",
                        "resource_type": "youtube_playlist",
                        "duration": "6 hours"
                    }
                ]
            },
            {
                "title": "Docker Containers & Packaging",
                "description": "Understand microservice containerization. Learn Dockerfiles, image building, registry pushes, networking, volumes, and orchestrating multiple services with Docker Compose.",
                "order": 2,
                "difficulty": "Intermediate",
                "duration": "2 weeks",
                "resources": [
                    {
                        "title": "Docker and Containers Course",
                        "url": "https://www.youtube.com/playlist?list=PL4cUxeGkcC9hxjeJoVdi4e4V8fPZ98n4G",
                        "resource_type": "youtube_playlist",
                        "duration": "5 hours"
                    }
                ]
            },
            {
                "title": "CI/CD & GitHub Actions Automation",
                "description": "Automate tests, build validation, and deployments. Write custom YAML workflows to run linters, trigger containers, and deliver clean code continuously.",
                "order": 3,
                "difficulty": "Intermediate",
                "duration": "2 weeks",
                "resources": [
                    {
                        "title": "GitHub Actions CI/CD Playlist",
                        "url": "https://www.youtube.com/playlist?list=PLN3n1USn4xNy6e8Z515s1203gVw9V1dPy",
                        "resource_type": "youtube_playlist",
                        "duration": "4 hours"
                    }
                ]
            },
            {
                "title": "Kubernetes Container Orchestration",
                "description": "Manage thousands of containers. Understand clusters, pods, services, deployments, ingress, configmaps, persistent volumes, and scaling systems dynamically.",
                "order": 4,
                "difficulty": "Advanced",
                "duration": "4 weeks",
                "resources": [
                    {
                        "title": "Kubernetes Complete Guide",
                        "url": "https://www.youtube.com/playlist?list=PL4cUxeGkcC9j0pEs871KjGpH24_U-fbaO",
                        "resource_type": "youtube_playlist",
                        "duration": "10 hours"
                    }
                ]
            }
        ]

        # --- 4. DATA SCIENTIST & AI ENGINEER ---
        ai = Career.objects.create(
            title="Data Scientist & AI Engineer",
            description="Uncover secret insights from massive raw data. Build statistical models, engineer machine learning pipelines, train deep learning networks, and deploy AI products that think.",
            icon="Brain",
            theme_color="linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)"
        )

        nodes_ai = [
            {
                "title": "Python for Data Analysis",
                "description": "Start with core data science libraries: NumPy for numerical data arrays, Pandas for database table manipulation, and Matplotlib/Seaborn for advanced data visualizations.",
                "order": 1,
                "difficulty": "Beginner",
                "duration": "2 weeks",
                "resources": [
                    {
                        "title": "Python for Data Analysis Course",
                        "url": "https://www.youtube.com/playlist?list=PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS",
                        "resource_type": "youtube_playlist",
                        "duration": "7 hours"
                    }
                ]
            },
            {
                "title": "Data Preprocessing & Math",
                "description": "Learn the vital mathematical pillars: Linear Algebra, Calculus, and Probability. Clean missing records, standardize features, and prepare clean dataset inputs.",
                "order": 2,
                "difficulty": "Beginner",
                "duration": "3 weeks",
                "resources": [
                    {
                        "title": "Data Preprocessing & Mathematics",
                        "url": "https://www.youtube.com/playlist?list=PLZoTAELRMXVN7QGpcuN-VgqyTuAEz-T8H",
                        "resource_type": "youtube_playlist",
                        "duration": "8 hours"
                    }
                ]
            },
            {
                "title": "Machine Learning (Scikit-Learn)",
                "description": "Master classic ML algorithms. Train Regression, Classification, Support Vector Machines, Random Forests, Decision Trees, K-Means Clustering, and assess precision/recall scores.",
                "order": 3,
                "difficulty": "Intermediate",
                "duration": "4 weeks",
                "resources": [
                    {
                        "title": "Machine Learning Course with Python",
                        "url": "https://www.youtube.com/playlist?list=PLZoTAELRMXVMdJ5hp24O_tIzrxuVdK4H-",
                        "resource_type": "youtube_playlist",
                        "duration": "15 hours"
                    }
                ]
            },
            {
                "title": "Deep Learning & Neural Networks",
                "description": "Dive into Artificial Neural Networks (ANNs), CNNs for computer vision, RNNs/Transformers for NLP, using popular frameworks like PyTorch or TensorFlow.",
                "order": 4,
                "difficulty": "Advanced",
                "duration": "4 weeks",
                "resources": [
                    {
                        "title": "Deep Learning & PyTorch Course",
                        "url": "https://www.youtube.com/playlist?list=PLZoTAELRMXVPGU70ZGsckrMdr0FmlNJNy",
                        "resource_type": "youtube_playlist",
                        "duration": "12 hours"
                    }
                ]
            }
        ]

        # --- 5. CYBERSECURITY SPECIALIST ---
        cyber = Career.objects.create(
            title="Cybersecurity Specialist",
            description="Guard the digital frontier. Audit systems, simulate advanced penetration hacking threats, configure robust defense networks, and dissect malicious software to secure business data.",
            icon="Shield",
            theme_color="linear-gradient(135deg, #ef4444 0%, #991b1b 100%)"
        )

        nodes_cy = [
            {
                "title": "Computer Networking & Protocols",
                "description": "Understand core digital transport. Master the OSI Model, TCP/IP protocols, DNS operations, Subnetting, IP routing, Ports, and diagnosing packets via Wireshark.",
                "order": 1,
                "difficulty": "Beginner",
                "duration": "3 weeks",
                "resources": [
                    {
                        "title": "CompTIA Network+ Tutorial",
                        "url": "https://www.youtube.com/playlist?list=PLG49S3nxzAnlGHY8h2ghFgIqNhHQCl5pG",
                        "resource_type": "youtube_playlist",
                        "duration": "14 hours"
                    }
                ]
            },
            {
                "title": "Kali Linux & Security Basics",
                "description": "Get comfortable inside standard penetration distributions. Master user permissions, CLI commands, port scanning, firewalls, and cryptographic basics (symmetric/asymmetric encryption).",
                "order": 2,
                "difficulty": "Beginner",
                "duration": "2 weeks",
                "resources": [
                    {
                        "title": "Linux for Hackers & Security",
                        "url": "https://www.youtube.com/playlist?list=PLBf0hzazHTGM8V_GfQDkSkf-3lB3oG1dF",
                        "resource_type": "youtube_playlist",
                        "duration": "6 hours"
                    }
                ]
            },
            {
                "title": "Ethical Hacking & Penetration Testing",
                "description": "Learn standard auditing methodologies. Scan networks with Nmap, test web vulnerabilities (SQL Injection, XSS), abuse privilege escalation, and operate Metasploit safely.",
                "order": 3,
                "difficulty": "Intermediate",
                "duration": "4 weeks",
                "resources": [
                    {
                        "title": "Ethical Hacking & PenTesting Course",
                        "url": "https://www.youtube.com/playlist?list=PLBf0hzazHTGN_1EaRymMh-V8M9kXyQSiA",
                        "resource_type": "youtube_playlist",
                        "duration": "16 hours"
                    }
                ]
            }
        ]

        # SEED ALL DATA
        def save_nodes_and_resources(career_obj, nodes_list):
            for n in nodes_list:
                node = RoadmapNode.objects.create(
                    career=career_obj,
                    title=n["title"],
                    description=n["description"],
                    order=n["order"],
                    difficulty=n["difficulty"],
                    duration=n["duration"]
                )
                for res in n["resources"]:
                    Resource.objects.create(
                        node=node,
                        title=res["title"],
                        url=res["url"],
                        resource_type=res["resource_type"],
                        duration=res["duration"]
                    )

        save_nodes_and_resources(frontend, nodes_fe)
        save_nodes_and_resources(backend, nodes_be)
        save_nodes_and_resources(devops, nodes_do)
        save_nodes_and_resources(ai, nodes_ai)
        save_nodes_and_resources(cyber, nodes_cy)

        self.stdout.write(self.style.SUCCESS("Database successfully seeded with 5 careers and rich educational roadmaps!"))
