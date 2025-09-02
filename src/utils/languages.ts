export interface Language {
  name: string;
  iconName: string;
  className?: string;
}

export const languages: Record<string, Language> = {
  angular: {
    name: "Angular",
    iconName: "angular",
  },
  astro: {
    name: "Astro",
    iconName: "astro",
  },
  vue: {
    name: "Vue",
    iconName: "material-icon-theme:vue",
  },
  bootstrap: {
    name: "Bootstrap",
    iconName: "bootstrap",
  },
  cloudflare: {
    name: "Cloudflare",
    iconName: "cloudflare",
  },
  html: {
    name: "HTML 5",
    iconName: "html",
  },
  javascript: {
    name: "JavaScript",
    iconName: "javascript",
  },
  mongo: {
    name: "MongoDb",
    iconName: "mongo",
  },
  mysql: {
    name: "MySQL",
    iconName: "mysql",
  },
  wordpress: {
    name: "Wordpress",
    iconName: "wordpress",
  },
  node: {
    name: "Node.js",
    iconName: "node",
  },
  tailwind: {
    name: "Tailwind CSS",
    iconName: "tailwind",
  },
  figma: {
    name: "Figma",
    iconName: "figma",
  },
  firebase: {
    name: "Firebase",
    iconName: "firebase",
  },
  markdown: {
    name: "Markdown",
    iconName: "markdown",
  },
  php: {
    name: "PHP",
    iconName: "php",
  },
  sass: {
    name: "Sass",
    iconName: "sass",
  },
  ts: {
    name: "TypeScript",
    iconName: "typescript",
  },
  git: {
    name: "Git",
    iconName: "git",
  },
  css: {
    name: "CSS",
    iconName: "css",
  },
  vercel: {
    name: "Vercel",
    iconName: "vercel",
  },
  netlify: {
    name: "Netlify",
    iconName: "netlify",
  },
  gatsby: {
    name: "Gatsby",
    iconName: "gatsby",
  },
  windsurf: {
    name: "Windsurf",
    iconName: "windsurf-logo",
  },
  cursor: {
    name: "Cursor",
    iconName: "cursor-ia",
  },
  deepseek: {
    name: "DeepSeek",
    iconName: "deepseek",
  },
  python: {
    name: "Python",
    iconName: "python",
  },
  gcp: {
    name:"Google Cloud Platform",
    iconName: "logos:google-cloud",
  },
  splunk: {
    name: "Splunk",
    iconName: "splunk",
  },
  snort:{
    name: "Snort",
    iconName: "vscode-icons:file-type-snort",
  },
  powershell:{
    name: "PowerShell",
    iconName: "vscode-icons:file-type-powershell",
  },
  bash:{
    name: "Bash",
    iconName: "logos:bash-icon",
  },
  wireshark:{
    name: "Wireshark",
    iconName: "wireshark",
  },
  autopsy:{
    name: "Autopsy",
    className: "text-black",
    iconName: "autopsy",
  },
  eztools:{
    name: "EZ Tools",
    iconName: "eztools",
  },
  cyberchef:{
    name: "CyberChef",
    className: "text-white",
    iconName: "solar:chef-hat-bold",
  },
  ftkimager:{
    name: "FTK Imager",
    iconName: "ftkimager",
  },
  virustotal:{
    name: "VirusTotal",
    className: "text-white",
    iconName: "simple-icons:virustotal",
  },
};

export const getLanguage = (lang: string): Language => {
  return languages[lang] || languages.html;
}; 