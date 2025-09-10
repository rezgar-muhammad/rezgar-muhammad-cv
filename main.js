document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const elements = {
        mobileMenuButton: document.getElementById('mobile-menu-button'),
        mobileMenu: document.getElementById('mobile-menu'),
        langToggleButton: document.getElementById('lang-toggle-button'),
        langToggleButtonMobile: document.getElementById('lang-toggle-button-mobile'),
        flags: {
            de: document.getElementById('flag-de'),
            en: document.getElementById('flag-en'),
            deMobile: document.getElementById('flag-de-mobile'),
            enMobile: document.getElementById('flag-en-mobile')
        },
        navLinks: document.querySelectorAll('.nav-link, .dropdown-link'),
        elementsToTranslate: document.querySelectorAll('[data-lang-key]'),
        containers: {
            timeline: document.getElementById('timeline-container'),
            certifications: document.getElementById('certifications-container'),
            languages: document.getElementById('languages-list'),
            hobbies: document.getElementById('hobbies-list')
        }
    };

    // State Management
    let currentLang = localStorage.getItem('lang') || 'de';
    let myChart = null;

    const cvContent = {
        de: {
            title: 'Interaktiver Lebenslauf - Rezgar Muhammad',
            role: 'Senior Software Engineer',
            nav_experience: 'Erfahrung',
            nav_skills: 'Fähigkeiten',
            nav_more_sections: 'Weitere Sektionen',
            nav_more_sections_mobile: 'Weitere Sektionen',
            certifications_title: 'Zertifizierungen',
            certifications_title_mobile: 'Zertifizierungen',
            education_title: 'Ausbildung',
            education_title_mobile: 'Ausbildung',
            others_title: 'Sonstiges',
            others_title_mobile: 'Sonstiges',
            profile_title: 'Profilzusammenfassung',
            profile_summary: 'Erfahrener Senior Software Engineer mit über 7 Jahren Erfahrung in der Webentwicklung, spezialisiert auf Full-Stack- und Frontend-Lösungen. Nachgewiesene Expertise in <b>Web-Engineering</b>, <b>Softwarearchitektur</b> und <b>Cloud-Technologien</b> (mit Fokus auf <b>Azure</b>). Kompetent in der Ausführung komplexer Projekte von der Konzeption bis zur Implementierung, mit starkem Fokus auf qualitativ hochwertigen Code und teamübergreifende Zusammenarbeit in einem agilen Umfeld.',
            experience_title: 'Berufserfahrung',
            experience_projects_label: 'Wichtige Projekte:',
            experience_data: [
                {
                    company: "MaibornWolff GmbH",
                    period: "Seit 2022",
                    role: "Senior Software Engineer",
                    projects: [
                        {
                            name: "ReMIS 2 (Airbus Helicopters)",
                            description: "Das Resource Management Information System (ReMIS) ist eine zentrale Software, die von Airbus Helicopters in mehreren europäischen Ländern zur Organisation der Verteilung von Mitarbeitern und anderen Ressourcen auf Projekte eingesetzt wird. Es ist ein entscheidendes internes Tool zur Planung der Arbeitsbelastung von Mitarbeitern und externen Lieferanten und zur Verteilung ihrer Arbeitskraft auf verschiedene Projekte. All diese Daten werden zur Erstellung verschiedener Berichte und Grafiken verwendet, die eine Grundlage für Managemententscheidungen bilden und Teammitgliedern helfen, die notwendigen Ressourcen für ihre Projekte zu sammeln und zu organisieren.",
                            role: "Full-Stack-Entwickler",
                            technologies: "Kotlin, Spring Boot, Spring Data, Angular, MariaDB, QueryDSL, Azure"
                        },
                        {
                            name: "Reporting Dashboard für Beiersdorf",
                            description: "Full-Stack-Entwicklung eines anpassbaren Dashboards für Geschäftsberichte, das Daten über APIs konsolidiert.",
                            role: "Full-Stack-Entwickler",
                            technologies: "Vue.js, Python, Azure DevOps, TypeScript, Azure Power Platform, Azure Cloud, Flask"
                        },
                        {
                            name: "KI-gesteuerte UI-Framework-Migration (Internes Projekt bei MaibornWolff GmbH)",
                            description: "Pilotprojekt zur Migration von Vue 2 auf Vue 3 unter Verwendung von Large Language Models (LLM).",
                            role: "Entwickler",
                            technologies: "Python, Vue.js, OpenAI, Copilot"
                        }
                    ]
                },
                {
                    company: "MaibornWolff GmbH",
                    period: "2020 – 2022",
                    role: "Software Engineer",
                    projects: [
                        {
                            name: "Gas Detection Connect (Dräger)",
                            description: "Frontend-Entwicklung einer Kubernetes-Cloud-Anwendung zur Echtzeit-Überwachung von Gasdetektoren und Arbeitern in Industrieanlagen.",
                            role: "Frontend-Entwickler",
                            technologies: "Azure, Serverless, Kubernetes, Angular, Azure Functions, TypeScript, .NET"
                        },
                        {
                            name: "ennexOS Web UI - Release Manager (SMA Solar Technology AG)",
                            description: "Entwicklung eines Angular-basierten Webportals zur Verwaltung und Aktualisierung der Firmware von Solarkomponenten.",
                            role: "Full-Stack-Software-Engineer",
                            technologies: "Angular, RxJS, Java, Swagger, Jenkins, Jira, Scrum, TypeScript, Docker, Keycloak"
                        },
                        {
                            name: "Mentoring Management (Internes Projekt)",
                            description: "Backend-Entwicklung eines Tools zur Verwaltung von Mentoring-Phasen für neue Kollegen, einschließlich eines Matching-Algorithmus.",
                            role: "Backend-Software-Engineer",
                            technologies: "Nest.js, React, TypeScript, GraphQL"
                        }
                    ]
                },
                {
                    company: "evodion IT Technologies GmbH",
                    period: "2017 – 2020",
                    role: "IT Consultant",
                    projects: [
                        {
                            name: "evoTrace",
                            description: "Full-Stack-Entwicklung einer Plattform zur Vereinfachung der Wartung von Industrieanlagen. Verantwortlich für Frontend-Verbesserungen und Fehlerbehebungen.",
                            role: "Full-Stack-Entwickler",
                            technologies: "Angular, .NET Core, SQL Server, C#, TypeScript, JavaScript, jQuery, Entity Framework"
                        }
                    ]
                }
            ],
            skills_title: 'Kernkompetenzen',
            skills_description: 'Diese Grafik gibt einen visuellen Überblick über meine technischen Fähigkeiten, zur besseren Übersicht kategorisiert. Sie spiegelt meine praktische Erfahrung und Kompetenz in verschiedenen modernen Technologien wider, die für das Software-Engineering unerlässlich sind.',
            skills_proficiency_label: 'Kompetenz',
            skills_labels: ["Programmiersprachen & Frameworks", "Cloud & DevOps", "Methoden & Tools", "Softwarearchitektur"],
            certifications_data: [
                { name: "Microsoft Certified: Azure Developer Associate", date: "Erworben: 31. Juli 2025" },
                { name: "Professional Scrum Developer I (PSD I)", date: "7. Januar 2025" },
                { name: "iSAQB® Certified Professional for Software Architecture - Foundation Level", date: "28. November 2023" },
                { name: "iSAQB® Module: Web-based Software Architecture (WEB)", date: "Teilnahme, 15.-17. März 2023" },
                { name: "Microsoft Certified: Azure AI Fundamentals", date: "" },
                { name: "Microsoft Certified: Azure Fundamentals (AZ-900)", date: "" },
                { name: "Berechtigung zur Führung des Berufstitels 'Ingenieur'", date: "Deutschland, 25. Januar 2017" }
            ],
            education_degree: 'University of Aleppo, Bachelor of Engineering - Informatics Engineering',
            education_period: '(2010 – 2015)',
            education_thesis_label: 'Abschlussarbeit:',
            education_thesis_text: '"Voice Recognition Security System" – Entwicklung eines Sprachauthentifizierungssystems als Sicherheitsebene für eine Windows-Anwendung.',
            languages_title: 'Sprachen',
            languages_data: [
                { name: 'Kurdisch', proficiency: 'Muttersprache' },
                { name: 'Arabisch', proficiency: 'Muttersprache' },
                { name: 'Englisch', proficiency: 'C1' },
                { name: 'Deutsch', proficiency: 'C1' }
            ],
            hobbies_title: 'Hobbys',
            hobbies_data: [
                'Fußball',
                'Tischtennis'
            ],
            contact_title: 'Kontakt',
            contact_email_label: 'E-Mail:',
            contact_phone_label: 'Telefon:',
            contact_location_label: 'Standort:',
            contact_location_text: 'Hamburg, Deutschland',
            contact_xing_label: 'Xing Profil:',
            contact_linkedin_label: 'LinkedIn Profil:',
            footer_text_1: 'Coding is my passion. Let\'s connect!',
            footer_text_2: '&copy; 2025 Rezgar Muhammad'
        },
        en: {
            title: 'Interactive CV - Rezgar Muhammad',
            role: 'Senior Software Engineer',
            nav_experience: 'Experience',
            nav_skills: 'Skills',
            nav_more_sections: 'More Sections',
            nav_more_sections_mobile: 'More Sections',
            certifications_title: 'Certifications',
            certifications_title_mobile: 'Certifications',
            education_title: 'Education',
            education_title_mobile: 'Education',
            others_title: 'Other',
            others_title_mobile: 'Other',
            profile_title: 'Profile Summary',
            profile_summary: 'Experienced Senior Software Engineer with over 7 years of experience in web development, specializing in full-stack and frontend solutions. Proven expertise in <b>Web Engineering</b>, <b>Software Architecture</b>, and <b>Cloud Technologies</b> (with a focus on <b>Azure</b>). Proficient in executing complex projects, from conception to implementation, with a strong focus on high-quality code and cross-functional collaboration in an an agile environment.',
            experience_title: 'Professional Experience',
            experience_projects_label: 'Key Projects:',
            experience_data: [
                {
                    company: "MaibornWolff GmbH",
                    period: "Since 2022",
                    role: "Senior Software Engineer",
                    projects: [
                        {
                            name: "ReMIS 2 (Airbus Helicopters)",
                            description: "The Resource Management Information System (ReMIS) is a central software used by Airbus Helicopters in several countries of Europe to organize the distribution of people and other resources to project. It's a crucial internal tool to plan the workloads of employees and external suppliers and distribute their manpower accross different projects. All those data is used to generate several reports and graphics which a foundation for management descisions as well as helping squad member gathering and organizing the necessary resources for their projects.",
                            role: "Full-stack developer",
                            technologies: "Kotlin, Spring Boot, Spring Data, Angular, MariaDB, QueryDSL, Azure"
                        },
                        {
                            name: "Reporting Dashboard for Beiersdorf",
                            description: "Full-stack development of a customizable dashboard for business reports, which consolidates data via APIs.",
                            role: "Full-stack Developer",
                            technologies: "Vue.js, Python, Azure DevOps, TypeScript, Azure Power Platform, Azure Cloud, Flask"
                        },
                        {
                            name: "AI-driven UI Framework Migration (Internal Project at MaibornWolff GmbH)",
                            description: "Pilot project to migrate from Vue 2 to Vue 3 using Large Language Models (LLM).",
                            role: "Developer",
                            technologies: "Python, Vue.js, OpenAI, Copilot"
                        }
                    ]
                },
                {
                    company: "MaibornWolff GmbH",
                    period: "2020 – 2022",
                    role: "Software Engineer",
                    projects: [
                        {
                            name: "Gas Detection Connect (Dräger)",
                            description: "Frontend development of a Kubernetes cloud application for real-time monitoring of gas detectors and workers in industrial plants.",
                            role: "Frontend Developer",
                            technologies: "Azure, Serverless, Kubernetes, Angular, Azure Functions, TypeScript, .NET"
                        },
                        {
                            name: "ennexOS Web UI - Release Manager (SMA Solar Technology AG)",
                            description: "Development of an Angular-based web portal for managing and updating the firmware of solar system components.",
                            role: "Full-stack Software Engineer",
                            technologies: "Angular, RxJS, Java, Swagger, Jenkins, Jira, Scrum, TypeScript, Docker, Keycloak"
                        },
                        {
                            name: "Mentoring Management (Internal Project)",
                            description: "Backend development of a tool to manage mentoring phases for new colleagues, including a matching algorithm.",
                            role: "Backend Software Engineer",
                            technologies: "Nest.js, React, TypeScript, GraphQL"
                        }
                    ]
                },
                {
                    company: "evodion IT Technologies GmbH",
                    period: "2017 – 2020",
                    role: "IT Consultant",
                    projects: [
                        {
                            name: "evoTrace",
                            description: "Full-stack development of a platform to simplify the maintenance of industrial plants. Responsible for frontend enhancements and bug fixing.",
                            role: "Full-stack Developer",
                            technologies: "Angular, .NET Core, SQL Server, C#, TypeScript, JavaScript, jQuery, Entity Framework"
                        }
                    ]
                }
            ],
            skills_title: 'Core Competencies',
            skills_description: 'This chart provides a visual overview of my technical skills, categorized for clarity. It reflects my hands-on experience and proficiency in various modern technologies essential for software engineering.',
            skills_proficiency_label: 'Proficiency',
            skills_labels: ["Programming Languages & Frameworks", "Cloud & DevOps", "Methods & Tools", "Software Architecture"],
            certifications_data: [
                { name: "Microsoft Certified: Azure Developer Associate", date: "Earned: July 31, 2025" },
                { name: "Professional Scrum Developer I (PSD I)", date: "January 7, 2025" },
                { name: "iSAQB® Certified Professional for Software Architecture - Foundation Level", date: "November 28, 2023" },
                { name: "iSAQB® Module: Web-based Software Architecture (WEB)", date: "Participation, March 15-17, 2023" },
                { name: "Microsoft Certified: Azure AI Fundamentals", date: "" },
                { name: "Microsoft Certified: Azure Fundamentals (AZ-900)", date: "" },
                { name: "Authorization to use the professional title 'Ingenieur'", date: "Germany, January 25, 2017" }
            ],
            education_degree: 'University of Aleppo, Bachelor of Engineering - Informatics Engineering',
            education_period: '(2010 – 2015)',
            education_thesis_label: 'Thesis:',
            education_thesis_text: '"Voice Recognition Security System" – Development of a voice authentication system as a security layer for a Windows application.',
            languages_title: 'Languages',
            languages_data: [
                { name: 'Kurdish', proficiency: 'Native' },
                { name: 'Arabic', proficiency: 'Native' },
                { name: 'English', proficiency: 'C1' },
                { name: 'German', proficiency: 'C1' }
            ],
            hobbies_title: 'Hobbies',
            hobbies_data: [
                'Football',
                'Table Tennis'
            ],
            contact_title: 'Contact Information',
            contact_email_label: 'Email:',
            contact_phone_label: 'Phone:',
            contact_location_label: 'Location:',
            contact_location_text: 'Hamburg, Germany',
            contact_xing_label: 'Xing Profile:',
            contact_linkedin_label: 'LinkedIn Profile:',
            footer_text_1: 'Coding is my passion. Let\'s connect!',
            footer_text_2: '&copy; 2025 Rezgar Muhammad'
        },
        skills_datasets: [
            { label: 'Angular', proficiency: 5, category: 0 }, { label: 'React', proficiency: 2, category: 0 },
            { label: 'Vue.js', proficiency: 3, category: 0 }, { label: 'TypeScript', proficiency: 5, category: 0 },
            { label: 'JavaScript', proficiency: 5, category: 0 }, { label: 'Python', proficiency: 3, category: 0 },
            { label: 'Kotlin', proficiency: 4, category: 0 }, { label: 'Spring Boot', proficiency: 4, category: 0 },
            { label: 'Spring Data', proficiency: 3, category: 0 }, { label: 'C#', proficiency: 3, category: 0 },
            { label: '.NET', proficiency: 4, category: 0 }, { label: 'Node.js', proficiency: 4, category: 0 },
            { label: 'Nest.js', proficiency: 3, category: 0 }, { label: 'QueryDSL', proficiency: 3, category: 0 },
            { label: 'Azure', proficiency: 5, category: 1 }, { label: 'Azure DevOps', proficiency: 4, category: 1 },
            { label: 'Serverless', proficiency: 3, category: 1 }, { label: 'Kubernetes', proficiency: 2, category: 1 },
            { label: 'Docker', proficiency: 2, category: 1 }, { label: 'Jenkins', proficiency: 3, category: 1 },
            { label: 'Scrum', proficiency: 5, category: 2 }, { label: 'Jira', proficiency: 5, category: 2 },
            { label: 'GraphQL', proficiency: 3, category: 2 }, { label: 'REST APIs', proficiency: 5, category: 2 },
            { label: 'SQL Server', proficiency: 4, category: 2 }, { label: 'MariaDB', proficiency: 3, category: 2 },
            { label: 'Git', proficiency: 5, category: 2 },
            { label: 'Design Patterns', proficiency: 4, category: 3 }, { label: 'NF Requirements', proficiency: 4, category: 3 },
            { label: 'Documentation', proficiency: 5, category: 3 }
        ]
    };

    // Utility Functions
    const updateChart = (lang) => {
        const skillsCtx = document.getElementById('skillsChart').getContext('2d');
        if (myChart) {
            myChart.destroy();
        }

        const processedSkills = {
            labels: [],
            datasets: [{
                label: cvContent[lang].skills_proficiency_label,
                data: [],
                backgroundColor: 'rgba(71, 85, 105, 0.7)', // slate-700
                borderColor: 'rgba(51, 65, 85, 1)', // slate-800
                borderWidth: 1
            }]
        };

        const skillsByCategory = cvContent[lang].skills_labels.map(() => []);
        cvContent.skills_datasets.forEach(skill => {
            skillsByCategory[skill.category].push(skill);
        });

        skillsByCategory.forEach((category, index) => {
            processedSkills.labels.push(cvContent[lang].skills_labels[index]);
            processedSkills.datasets[0].data.push(0);

            category.sort((a, b) => {
                // First sort by proficiency
                if (b.proficiency !== a.proficiency) {
                    return b.proficiency - a.proficiency;
                }
                // If proficiency is equal, prioritize Angular
                if (a.label === 'Angular') return -1;
                if (b.label === 'Angular') return 1;
                // For other skills with equal proficiency, maintain alphabetical order
                return a.label.localeCompare(b.label);
            }).forEach(skill => {
                processedSkills.labels.push(skill.label);
                processedSkills.datasets[0].data.push(skill.proficiency);
            });
        });

        myChart = new Chart(skillsCtx, {
            type: 'bar',
            data: processedSkills,
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                         display: true,
                        ticks: {
                            color: '#475569', // slate-600
                            font: function (context) {
                                if (cvContent[lang].skills_labels.includes(context.tick.label)) {
                                    return { weight: 'bold', size: 14 };
                                }
                                return { size: 12 };
                            },
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            display: false
                        },
                        min: 0,
                        max: 5
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function (context) {
                                if (context.raw > 0) {
                                    return `${cvContent[lang].skills_proficiency_label}: ${context.raw}/5`;
                                }
                                return null;
                            }
                        }
                    }
                }
            }
        });
    };

    const updateFlagOpacity = (lang) => {
        const opacity = { active: '1', inactive: '0.5' };

        if (lang === 'de') {
            elements.flags.de.style.opacity = opacity.active;
            elements.flags.en.style.opacity = opacity.inactive;
            elements.flags.deMobile.style.opacity = opacity.active;
            elements.flags.enMobile.style.opacity = opacity.inactive;
        } else {
            elements.flags.de.style.opacity = opacity.inactive;
            elements.flags.en.style.opacity = opacity.active;
            elements.flags.deMobile.style.opacity = opacity.inactive;
            elements.flags.enMobile.style.opacity = opacity.active;
        }
    };

    const renderCertifications = (content) => {
        elements.containers.certifications.innerHTML = '';
        content.certifications_data.forEach(cert => {
            const certCard = document.createElement('div');
            certCard.className = 'bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center';
            certCard.innerHTML = `
                <div class="mb-3 text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                </div>
                <h3 class="font-bold text-slate-800 text-md">${cert.name}</h3>
                <p class="text-sm text-slate-500 mt-1">${cert.date}</p>
            `;
            elements.containers.certifications.appendChild(certCard);
        });
    };

    const renderLanguagesAndHobbies = (content) => {
        // Update languages
        elements.containers.languages.innerHTML = '';
        content.languages_data.forEach(langInfo => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="font-semibold">${langInfo.name}:</span> ${langInfo.proficiency}`;
            elements.containers.languages.appendChild(li);
        });

        // Update hobbies
        elements.containers.hobbies.innerHTML = '';
        content.hobbies_data.forEach(hobby => {
            const li = document.createElement('li');
            li.textContent = hobby;
            elements.containers.hobbies.appendChild(li);
        });
    };

    const renderTimeline = (content) => {
        elements.containers.timeline.innerHTML = '';
        content.experience_data.forEach((job, index) => {
            const alignmentClass = index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto';
            const timelineItem = document.createElement('div');
            timelineItem.className = `relative md:w-1/2 md:py-4 md:px-6 ${alignmentClass}`;

            let projectsHtml = job.projects.map(p => `
                <div class="mb-4 last:mb-0">
                    <h5 class="font-bold text-slate-700">${p.name}</h5>
                    <p class="text-sm text-slate-500 mb-1">${p.role}</p>
                    <p class="text-sm text-slate-600 mb-2">${p.description}</p>
                    <p class="text-xs text-slate-500"><span class="font-semibold">Tech:</span> ${p.technologies}</p>
                </div>
            `).join('');

            timelineItem.innerHTML = `
                <div class="absolute w-4 h-4 bg-slate-500 rounded-full top-0 md:top-7 left-0 md:left-1/2 md:-translate-x-1/2 -mt-1 border-4 border-white"></div>
                <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-6 timeline-item-trigger">
                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="text-lg font-bold text-slate-800">${job.role}</h3>
                            <h4 class="text-md font-medium text-slate-600">${job.company}</h4>
                            <p class="text-sm text-slate-500">${job.period}</p>
                        </div>
                        <div class="text-slate-500">
                            <svg class="w-6 h-6 expand-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                    <div class="mt-4 pt-4 border-t border-slate-200 timeline-item-content is-hidden">
                        <h4 class="font-semibold text-slate-700 mb-3 text-md">${content.experience_projects_label}</h4>
                        ${projectsHtml}
                    </div>
                </div>
            `;
            elements.containers.timeline.appendChild(timelineItem);
        });
    };

    // Main Language Loading Function
    const loadLanguage = (lang) => {
        const content = cvContent[lang];

        // Update page title
        document.getElementById('page-title').textContent = content.title;

        // Update all translatable elements
        elements.elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (content[key]) {
                element.innerHTML = content[key];
            }
        });

        // Render dynamic content
        renderCertifications(content);
        renderLanguagesAndHobbies(content);
        renderTimeline(content);
        updateChart(lang);
    };

    // Event Handlers
    const toggleLanguage = () => {
        currentLang = currentLang === 'de' ? 'en' : 'de';
        localStorage.setItem('lang', currentLang);
        loadLanguage(currentLang);
        updateFlagOpacity(currentLang);
    };

    const closeMobileMenu = () => {
        elements.mobileMenu.classList.add('hidden');
    };

    // Event Listeners
    elements.langToggleButton.addEventListener('click', toggleLanguage);
    elements.langToggleButtonMobile.addEventListener('click', toggleLanguage);

    elements.mobileMenuButton.addEventListener('click', () => {
        elements.mobileMenu.classList.toggle('hidden');
    });

    // FIXED: Remove the problematic loadLanguage call from navigation links
    elements.navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Timeline expansion functionality
    elements.containers.timeline.addEventListener('click', function (e) {
        const trigger = e.target.closest('.timeline-item-trigger');
        if (trigger) {
            const content = trigger.querySelector('.timeline-item-content');
            const icon = trigger.querySelector('.expand-icon');
            content.classList.toggle('is-hidden');
            icon.classList.toggle('rotate-180');
        }
    });

    // Initialize application
    loadLanguage(currentLang);
    updateFlagOpacity(currentLang);
});