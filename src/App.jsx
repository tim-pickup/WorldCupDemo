import { useState } from "react";

// Sample data simulating the JSON structure
const SAMPLE_DATA = {
  lastUpdated: "2026-06-15T07:00:00Z",
  matchDay: 5,
  tournament: "FIFA World Cup 2026",
  phase: "Group Stage",
  players: [
    {
      id: 1, name: "Tim H", pin: "1234", totalPoints: 18,
      teams: [
        { name: "England", tier: 1, flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", mechanism: "scored", captain: "Harry Kane", points: 8, goals: 5, captainGoals: 1, ownGoals: 0, yellows: 1, reds: 0,
          squad: ["Harry Kane", "Jude Bellingham", "Bukayo Saka", "Phil Foden", "Marcus Rashford", "Declan Rice", "Trent Alexander-Arnold", "John Stones", "Jordan Pickford", "Jack Grealish", "Cole Palmer"] },
        { name: "Mexico", tier: 2, flag: "🇲🇽", mechanism: "conceded", captain: "Raúl Jiménez", points: 4, goals: 4, captainGoals: 0, ownGoals: 0, yellows: 2, reds: 0,
          squad: ["Raúl Jiménez", "Hirving Lozano", "Edson Álvarez", "Guillermo Ochoa", "Henry Martín", "Alexis Vega", "Jorge Sánchez", "César Montes", "Héctor Herrera", "Roberto Alvarado"] },
        { name: "Saudi Arabia", tier: 3, flag: "🇸🇦", mechanism: "conceded", captain: "Salem Al-Dawsari", points: 6, goals: 7, captainGoals: 0, ownGoals: 1, yellows: 1, reds: 0,
          squad: ["Salem Al-Dawsari", "Mohammed Al-Owais", "Firas Al-Buraikan", "Saleh Al-Shehri", "Yasser Al-Shahrani", "Ali Al-Bulayhi", "Sami Al-Najei", "Abdullah Otayf", "Hassan Tambakti", "Mohammed Al-Qasem"] },
      ]
    },
    {
      id: 2, name: "Sarah K", pin: "2345", totalPoints: 15,
      teams: [
        { name: "France", tier: 1, flag: "🇫🇷", mechanism: "scored", captain: "Kylian Mbappé", points: 10, goals: 6, captainGoals: 2, ownGoals: 0, yellows: 0, reds: 0,
          squad: ["Kylian Mbappé", "Antoine Griezmann", "Ousmane Dembélé", "Marcus Thuram", "Aurélien Tchouaméni", "Eduardo Camavinga", "Theo Hernandez", "Jules Koundé", "Dayot Upamecano", "Mike Maignan"] },
        { name: "USA", tier: 2, flag: "🇺🇸", mechanism: "scored", captain: "Christian Pulisic", points: 3, goals: 3, captainGoals: 0, ownGoals: 0, yellows: 1, reds: 0,
          squad: ["Christian Pulisic", "Tyler Adams", "Weston McKennie", "Gio Reyna", "Josh Sargent", "Tim Weah", "Sergiño Dest", "Brendan Aaronson", "Matt Turner", "Ricardo Pepi"] },
        { name: "Costa Rica", tier: 3, flag: "🇨🇷", mechanism: "conceded", captain: "Keylor Navas", points: 2, goals: 5, captainGoals: 0, ownGoals: 0, yellows: 3, reds: 0,
          squad: ["Keylor Navas", "Bryan Ruiz", "Joel Campbell", "Celso Borges", "Bryan Oviedo", "Francisco Calvo", "Yeltsin Tejeda", "Randall Leal", "Anthony Contreras", "Jewison Bennette"] },
      ]
    },
    {
      id: 3, name: "Dave M", pin: "3456", totalPoints: 14,
      teams: [
        { name: "Brazil", tier: 1, flag: "🇧🇷", mechanism: "scored", captain: "Vinícius Jr", points: 9, goals: 5, captainGoals: 2, ownGoals: 0, yellows: 3, reds: 0,
          squad: ["Vinícius Jr", "Rodrygo", "Raphinha", "Gabriel Jesus", "Casemiro", "Bruno Guimarães", "Marquinhos", "Éder Militão", "Alisson", "Lucas Paquetá", "Fred"] },
        { name: "South Korea", tier: 2, flag: "🇰🇷", mechanism: "scored", captain: "Son Heung-min", points: 4, goals: 4, captainGoals: 0, ownGoals: 0, yellows: 2, reds: 0,
          squad: ["Son Heung-min", "Lee Kang-in", "Kim Min-jae", "Hwang Hee-chan", "Cho Gue-sung", "Kim Seung-gyu", "Jung Woo-young", "Kim Jin-su", "Kwon Chang-hoon", "Lee Jae-sung"] },
        { name: "New Zealand", tier: 3, flag: "🇳🇿", mechanism: "conceded", captain: "Chris Wood", points: 1, goals: 6, captainGoals: 0, ownGoals: 1, yellows: 2, reds: 0,
          squad: ["Chris Wood", "Clayton Lewis", "Winston Reid", "Liberato Cacace", "Bill Tuilagi", "Matthew Garbett", "Alex Greive", "Michael Boxall", "Joe Bell", "Elijah Just"] },
      ]
    },
    {
      id: 4, name: "Laura P", pin: "4567", totalPoints: 12,
      teams: [
        { name: "Argentina", tier: 1, flag: "🇦🇷", mechanism: "scored", captain: "Lionel Messi", points: 7, goals: 4, captainGoals: 1, ownGoals: 0, yellows: 2, reds: 0,
          squad: ["Lionel Messi", "Julián Álvarez", "Lautaro Martínez", "Enzo Fernández", "Rodrigo De Paul", "Alexis Mac Allister", "Emiliano Martínez", "Nicolás Otamendi", "Nahuel Molina", "Lisandro Martínez"] },
        { name: "Japan", tier: 2, flag: "🇯🇵", mechanism: "conceded", captain: "Takumi Minamino", points: 3, goals: 3, captainGoals: 0, ownGoals: 0, yellows: 1, reds: 0,
          squad: ["Takumi Minamino", "Kaoru Mitoma", "Daichi Kamada", "Wataru Endo", "Junya Ito", "Ao Tanaka", "Daizen Maeda", "Maya Yoshida", "Hiroki Sakai", "Shuichi Gonda"] },
        { name: "Tunisia", tier: 3, flag: "🇹🇳", mechanism: "conceded", captain: "Youssef Msakni", points: 2, goals: 4, captainGoals: 0, ownGoals: 0, yellows: 2, reds: 0,
          squad: ["Youssef Msakni", "Wahbi Khazri", "Ellyes Skhiri", "Montassar Talbi", "Ali Maaloul", "Hannibal Mejbri", "Aymen Dahmen", "Nader Ghandri", "Seifeddine Jaziri", "Ghailene Chaalali"] },
      ]
    },
    {
      id: 5, name: "Chris W", pin: "5678", totalPoints: 11,
      teams: [
        { name: "Germany", tier: 1, flag: "🇩🇪", mechanism: "scored", captain: "Florian Wirtz", points: 6, goals: 4, captainGoals: 1, ownGoals: 0, yellows: 1, reds: 0,
          squad: ["Florian Wirtz", "Jamal Musiala", "Leroy Sané", "Kai Havertz", "Thomas Müller", "İlkay Gündoğan", "Joshua Kimmich", "Antonio Rüdiger", "Manuel Neuer", "Serge Gnabry", "Niclas Füllkrug"] },
        { name: "Ecuador", tier: 2, flag: "🇪🇨", mechanism: "scored", captain: "Moisés Caicedo", points: 2, goals: 2, captainGoals: 0, ownGoals: 0, yellows: 1, reds: 0,
          squad: ["Moisés Caicedo", "Enner Valencia", "Piero Hincapié", "Pervis Estupiñán", "Jeremy Sarmiento", "Gonzalo Plata", "Ángelo Preciado", "José Cifuentes", "Carlos Gruezo", "Djorkaeff Reasco"] },
        { name: "Canada", tier: 3, flag: "🇨🇦", mechanism: "conceded", captain: "Alphonso Davies", points: 3, goals: 5, captainGoals: 0, ownGoals: 0, yellows: 2, reds: 0,
          squad: ["Alphonso Davies", "Jonathan David", "Tajon Buchanan", "Stephen Eustáquio", "Cyle Larin", "Milan Borjan", "Richie Laryea", "Junior Hoilett", "Atiba Hutchinson", "Kamal Miller"] },
      ]
    },
    {
      id: 6, name: "Priya R", pin: "6789", totalPoints: 10,
      teams: [
        { name: "Spain", tier: 1, flag: "🇪🇸", mechanism: "scored", captain: "Lamine Yamal", points: 5, goals: 3, captainGoals: 1, ownGoals: 0, yellows: 1, reds: 0,
          squad: ["Lamine Yamal", "Pedri", "Gavi", "Rodri", "Álvaro Morata", "Ferran Torres", "Ansu Fati", "Unai Simón", "Dani Carvajal", "Aymeric Laporte", "Marcos Llorente"] },
        { name: "Serbia", tier: 2, flag: "🇷🇸", mechanism: "conceded", captain: "Dušan Vlahović", points: 4, goals: 5, captainGoals: 0, ownGoals: 0, yellows: 1, reds: 0,
          squad: ["Dušan Vlahović", "Aleksandar Mitrović", "Sergej Milinković-Savić", "Filip Kostić", "Luka Jović", "Nemanja Gudelj", "Strahinja Pavlović", "Vanja Milinković-Savić", "Andrija Živković", "Saša Lukić"] },
        { name: "IR Iran", tier: 3, flag: "🇮🇷", mechanism: "conceded", captain: "Mehdi Taremi", points: 1, goals: 4, captainGoals: 0, ownGoals: 0, yellows: 3, reds: 0,
          squad: ["Mehdi Taremi", "Sardar Azmoun", "Ali Gholizadeh", "Alireza Jahanbakhsh", "Alireza Beiranvand", "Saeid Ezatolahi", "Morteza Pouraliganji", "Majid Hosseini", "Shoja Khalilzadeh", "Ahmad Noorollahi"] },
      ]
    },
    {
      id: 7, name: "James B", pin: "7890", totalPoints: 8,
      teams: [
        { name: "Portugal", tier: 1, flag: "🇵🇹", mechanism: "scored", captain: "Cristiano Ronaldo", points: 4, goals: 3, captainGoals: 0, ownGoals: 0, yellows: 2, reds: 0,
          squad: ["Cristiano Ronaldo", "Bruno Fernandes", "Bernardo Silva", "João Félix", "Diogo Jota", "Rafael Leão", "Vitinha", "William Carvalho", "Rúben Dias", "Nuno Mendes", "Diogo Costa"] },
        { name: "Cameroon", tier: 2, flag: "🇨🇲", mechanism: "conceded", captain: "André-Frank Zambo Anguissa", points: 3, goals: 4, captainGoals: 0, ownGoals: 0, yellows: 1, reds: 0,
          squad: ["André-Frank Zambo Anguissa", "Karl Toko Ekambi", "Vincent Aboubakar", "Eric Maxim Choupo-Moting", "Bryan Mbeumo", "Nicolas Nkoulou", "Collins Fai", "Samuel Gouet", "Nouhou Tolo", "André Onana"] },
        { name: "Qatar", tier: 3, flag: "🇶🇦", mechanism: "conceded", captain: "Akram Afif", points: 1, goals: 6, captainGoals: 0, ownGoals: 1, yellows: 2, reds: 0,
          squad: ["Akram Afif", "Hassan Al-Haydos", "Almoez Ali", "Karim Boudiaf", "Pedro Miguel", "Meshaal Barsham", "Bassam Al-Rawi", "Boualem Khoukhi", "Ismaeel Mohammad", "Salem Al-Hajri"] },
      ]
    },
    {
      id: 8, name: "Meg T", pin: "8901", totalPoints: 6,
      teams: [
        { name: "Netherlands", tier: 1, flag: "🇳🇱", mechanism: "scored", captain: "Cody Gakpo", points: 3, goals: 2, captainGoals: 0, ownGoals: 0, yellows: 1, reds: 0,
          squad: ["Cody Gakpo", "Virgil van Dijk", "Memphis Depay", "Frenkie de Jong", "Xavi Simons", "Matthijs de Ligt", "Nathan Aké", "Denzel Dumfries", "Steven Bergwijn", "Jasper Cillessen"] },
        { name: "Ghana", tier: 2, flag: "🇬🇭", mechanism: "scored", captain: "Mohammed Kudus", points: 2, goals: 2, captainGoals: 0, ownGoals: 0, yellows: 0, reds: 0,
          squad: ["Mohammed Kudus", "Thomas Partey", "André Ayew", "Jordan Ayew", "Inaki Williams", "Kamaldeen Sulemana", "Daniel Amartey", "Joseph Aidoo", "Abdul Fatawu Issahaku", "Daniel Kofi Kyereh"] },
        { name: "Honduras", tier: 3, flag: "🇭🇳", mechanism: "conceded", captain: "Alberth Elis", points: 1, goals: 3, captainGoals: 0, ownGoals: 0, yellows: 2, reds: 0,
          squad: ["Alberth Elis", "Romell Quioto", "Eddie Hernández", "Maynor Figueroa", "Jonathan Rubio", "Bryan Moya", "Luis López", "Denil Maldonado", "Boniek García", "Héctor Castellanos"] },
      ]
    },
  ],
  recentMatches: [
    { date: "2026-06-14", home: "England", away: "Saudi Arabia", homeFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag: "🇸🇦", score: "3-1", group: "A" },
    { date: "2026-06-14", home: "France", away: "Costa Rica", homeFlag: "🇫🇷", awayFlag: "🇨🇷", score: "2-0", group: "B" },
    { date: "2026-06-14", home: "Brazil", away: "New Zealand", homeFlag: "🇧🇷", awayFlag: "🇳🇿", score: "4-1", group: "C" },
    { date: "2026-06-13", home: "Argentina", away: "Tunisia", homeFlag: "🇦🇷", awayFlag: "🇹🇳", score: "2-1", group: "D" },
    { date: "2026-06-13", home: "Germany", away: "Canada", homeFlag: "🇩🇪", awayFlag: "🇨🇦", score: "3-2", group: "E" },
    { date: "2026-06-13", home: "Spain", away: "IR Iran", homeFlag: "🇪🇸", awayFlag: "🇮🇷", score: "1-0", group: "F" },
  ],
  activityFeed: [
    { timestamp: "2026-06-14T20:45:00Z", player: "Tim H",   playerFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", team: "England",      teamFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", type: "goal",         detail: "England goal vs Saudi Arabia",          points: 1 },
    { timestamp: "2026-06-14T20:30:00Z", player: "Tim H",   playerFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", team: "England",      teamFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", type: "goal",         detail: "England goal vs Saudi Arabia",          points: 1 },
    { timestamp: "2026-06-14T20:10:00Z", player: "Tim H",   playerFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", team: "England",      teamFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", type: "captainGoal",  detail: "Harry Kane captain goal vs Saudi Arabia", points: 2 },
    { timestamp: "2026-06-14T20:05:00Z", player: "Tim H",   playerFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", team: "Saudi Arabia", teamFlag: "🇸🇦", type: "goal",         detail: "Saudi Arabia conceded vs England",      points: 1 },
    { timestamp: "2026-06-14T19:55:00Z", player: "Sarah K", playerFlag: "🇫🇷", team: "France",       teamFlag: "🇫🇷", type: "captainGoal",  detail: "Mbappé captain goal vs Costa Rica",     points: 2 },
    { timestamp: "2026-06-14T19:40:00Z", player: "Sarah K", playerFlag: "🇫🇷", team: "France",       teamFlag: "🇫🇷", type: "goal",         detail: "France goal vs Costa Rica",             points: 1 },
    { timestamp: "2026-06-14T19:30:00Z", player: "Sarah K", playerFlag: "🇫🇷", team: "Costa Rica",   teamFlag: "🇨🇷", type: "goal",         detail: "Costa Rica conceded vs France",         points: 1 },
    { timestamp: "2026-06-14T18:50:00Z", player: "Dave M",  playerFlag: "🇧🇷", team: "Brazil",       teamFlag: "🇧🇷", type: "captainGoal",  detail: "Vinícius Jr captain goal vs New Zealand", points: 2 },
    { timestamp: "2026-06-14T18:35:00Z", player: "Dave M",  playerFlag: "🇧🇷", team: "Brazil",       teamFlag: "🇧🇷", type: "goal",         detail: "Brazil goal vs New Zealand",            points: 1 },
    { timestamp: "2026-06-14T18:20:00Z", player: "Dave M",  playerFlag: "🇧🇷", team: "Brazil",       teamFlag: "🇧🇷", type: "goal",         detail: "Brazil goal vs New Zealand",            points: 1 },
    { timestamp: "2026-06-14T18:10:00Z", player: "Dave M",  playerFlag: "🇧🇷", team: "New Zealand",  teamFlag: "🇳🇿", type: "ownGoal",      detail: "New Zealand own goal vs Brazil",        points: -1 },
    { timestamp: "2026-06-13T21:00:00Z", player: "Laura P", playerFlag: "🇦🇷", team: "Argentina",    teamFlag: "🇦🇷", type: "captainGoal",  detail: "Messi captain goal vs Tunisia",         points: 2 },
    { timestamp: "2026-06-13T20:45:00Z", player: "Laura P", playerFlag: "🇦🇷", team: "Argentina",    teamFlag: "🇦🇷", type: "goal",         detail: "Argentina goal vs Tunisia",             points: 1 },
    { timestamp: "2026-06-13T20:30:00Z", player: "Laura P", playerFlag: "🇦🇷", team: "Tunisia",      teamFlag: "🇹🇳", type: "goal",         detail: "Tunisia conceded vs Argentina",         points: 1 },
    { timestamp: "2026-06-13T19:55:00Z", player: "Chris W", playerFlag: "🇩🇪", team: "Germany",      teamFlag: "🇩🇪", type: "captainGoal",  detail: "Wirtz captain goal vs Canada",          points: 2 },
    { timestamp: "2026-06-13T19:40:00Z", player: "Chris W", playerFlag: "🇩🇪", team: "Germany",      teamFlag: "🇩🇪", type: "goal",         detail: "Germany goal vs Canada",                points: 1 },
    { timestamp: "2026-06-13T19:25:00Z", player: "Chris W", playerFlag: "🇩🇪", team: "Canada",       teamFlag: "🇨🇦", type: "goal",         detail: "Canada conceded vs Germany",            points: 1 },
    { timestamp: "2026-06-13T18:50:00Z", player: "Priya R", playerFlag: "🇪🇸", team: "Spain",        teamFlag: "🇪🇸", type: "captainGoal",  detail: "Yamal captain goal vs IR Iran",         points: 2 },
    { timestamp: "2026-06-13T18:30:00Z", player: "Priya R", playerFlag: "🇪🇸", team: "IR Iran",      teamFlag: "🇮🇷", type: "goal",         detail: "IR Iran conceded vs Spain",             points: 1 },
    { timestamp: "2026-06-13T18:10:00Z", player: "Tim H",   playerFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", team: "England",      teamFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", type: "yellow",       detail: "England yellow card vs Saudi Arabia",   points: -1 },
    { timestamp: "2026-06-13T17:55:00Z", player: "Laura P", playerFlag: "🇦🇷", team: "Argentina",    teamFlag: "🇦🇷", type: "yellow",       detail: "Argentina yellow card vs Tunisia",      points: -1 },
  ],
};

const TIER_COLORS = {
  1: { bg: "#ffd700", text: "#1a1a2e", label: "TIER 1", desc: "Goals Scored" },
  2: { bg: "#c0c0c0", text: "#1a1a2e", label: "TIER 2", desc: "Player's Choice" },
  3: { bg: "#cd7f32", text: "#1a1a2e", label: "TIER 3", desc: "Goals Conceded" },
};

function RankBadge({ rank }) {
  const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };
  if (medals[rank]) {
    return <span style={{ fontSize: 28, lineHeight: 1 }}>{medals[rank]}</span>;
  }
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 700,
      fontSize: 18,
      color: "#64748b",
      width: 32,
      textAlign: "center",
      display: "inline-block",
    }}>
      {rank}
    </span>
  );
}

function TeamCard({ team }) {
  const tier = TIER_COLORS[team.tier];
  return (
    <div style={{
      background: "var(--card-inner-bg)",
      borderRadius: 10,
      padding: "12px 14px",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      border: "1px solid var(--border-subtle)",
      minWidth: 200,
      flex: 1,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22 }}>{team.flag}</span>
          <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>{team.name}</span>
        </div>
        <span style={{
          fontSize: 9,
          fontWeight: 800,
          letterSpacing: 1,
          background: tier.bg,
          color: tier.text,
          padding: "2px 8px",
          borderRadius: 4,
        }}>{tier.label}</span>
      </div>

      <div style={{ fontSize: 11, color: "var(--text-muted)", display: "flex", gap: 4, alignItems: "center" }}>
        <span>⚡</span>
        <span>{team.mechanism === "scored" ? "Goals Scored" : "Goals Conceded"}</span>
      </div>

      <div style={{ fontSize: 11, color: "var(--text-muted)", display: "flex", gap: 4, alignItems: "center" }}>
        <span>©️</span>
        <span style={{ fontWeight: 600 }}>{team.captain}</span>
        {team.captainGoals > 0 && <span style={{ color: "#22c55e", fontWeight: 700 }}>⚽ ×{team.captainGoals}</span>}
      </div>

      <div style={{
        display: "flex",
        gap: 10,
        fontSize: 11,
        color: "var(--text-muted)",
        borderTop: "1px solid var(--border-subtle)",
        paddingTop: 8,
        flexWrap: "wrap",
      }}>
        <span>⚽ {team.goals}</span>
        {team.ownGoals > 0 && <span style={{ color: "#ef4444" }}>🔴 OG ×{team.ownGoals}</span>}
        {team.yellows > 0 && <span>🟨 ×{team.yellows}</span>}
        {team.reds > 0 && <span>🟥 ×{team.reds}</span>}
        <span style={{ marginLeft: "auto", fontWeight: 800, color: "var(--text-primary)", fontSize: 13 }}>{team.points} pts</span>
      </div>
    </div>
  );
}

function PlayerRow({ player, rank, isExpanded, onToggle }) {
  return (
    <div style={{
      background: "var(--card-bg)",
      borderRadius: 14,
      marginBottom: 8,
      border: isExpanded ? "2px solid var(--accent)" : "1px solid var(--border-subtle)",
      overflow: "hidden",
      transition: "all 0.2s ease",
      boxShadow: isExpanded ? "0 4px 20px rgba(0,0,0,0.12)" : "none",
    }}>
      <div
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "14px 18px",
          cursor: "pointer",
          gap: 14,
          userSelect: "none",
        }}
      >
        <RankBadge rank={rank} />

        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>{player.name}</div>
          <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
            {player.teams.map((t) => (
              <span key={t.name} style={{ fontSize: 16 }} title={t.name}>{t.flag}</span>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 900,
            fontSize: 26,
            color: "var(--accent)",
            lineHeight: 1,
          }}>
            {player.totalPoints}
          </div>
          <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.5 }}>POINTS</div>
        </div>

        <div style={{
          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s",
          color: "var(--text-muted)",
          fontSize: 18,
        }}>▼</div>
      </div>

      {isExpanded && (
        <div style={{
          padding: "0 18px 16px",
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
        }}>
          {player.teams.map((t) => (
            <TeamCard key={t.name} team={t} />
          ))}
        </div>
      )}
    </div>
  );
}

function MatchCard({ match }) {
  return (
    <div style={{
      background: "var(--card-bg)",
      borderRadius: 10,
      padding: "10px 14px",
      border: "1px solid var(--border-subtle)",
      minWidth: 220,
      flex: "0 0 auto",
    }}>
      <div style={{ fontSize: 9, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 1, marginBottom: 6 }}>
        GROUP {match.group} · {new Date(match.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
          <span style={{ fontSize: 18 }}>{match.homeFlag}</span>
          <span style={{ fontWeight: 600, fontSize: 12, color: "var(--text-primary)" }}>{match.home}</span>
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 900,
          fontSize: 16,
          color: "var(--accent)",
          background: "var(--card-inner-bg)",
          padding: "2px 10px",
          borderRadius: 6,
        }}>{match.score}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, justifyContent: "flex-end" }}>
          <span style={{ fontWeight: 600, fontSize: 12, color: "var(--text-primary)" }}>{match.away}</span>
          <span style={{ fontSize: 18 }}>{match.awayFlag}</span>
        </div>
      </div>
    </div>
  );
}

const EVENT_CONFIG = {
  goal:        { icon: "⚽", label: "Goal",         color: "#22c55e" },
  captainGoal: { icon: "⭐", label: "Captain Goal", color: "#f59e0b" },
  ownGoal:     { icon: "🔴", label: "Own Goal",     color: "#ef4444" },
  yellow:      { icon: "🟨", label: "Yellow Card",  color: "#eab308" },
  red:         { icon: "🟥", label: "Red Card",     color: "#ef4444" },
};

function ActivityFeed({ events }) {
  let lastDate = null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {events.map((event, i) => {
        const date = new Date(event.timestamp).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
        const time = new Date(event.timestamp).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
        const cfg = EVENT_CONFIG[event.type] || { icon: "•", label: event.type, color: "#94a3b8" };
        const isPositive = event.points > 0;
        const showDate = date !== lastDate;
        lastDate = date;
        return (
          <div key={i}>
            {showDate && (
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "var(--text-muted)", padding: "16px 4px 8px", textTransform: "uppercase" }}>
                {date}
              </div>
            )}
            <div style={{
              background: "var(--card-bg)",
              borderRadius: 10,
              padding: "12px 14px",
              border: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{cfg.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{event.player}</span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>·</span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{event.teamFlag} {event.team}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{event.detail}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2, flexShrink: 0 }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 800,
                  fontSize: 15,
                  color: isPositive ? "#22c55e" : "#ef4444",
                  background: isPositive ? "#22c55e15" : "#ef444415",
                  padding: "2px 8px",
                  borderRadius: 6,
                }}>
                  {event.points > 0 ? "+" : ""}{event.points}
                </span>
                <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{time}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PinGate({ players, onAuth }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const match = players.find(p => p.pin === pin);
    if (match) {
      sessionStorage.setItem("sweepstake_pid", match.id);
      onAuth(match.id);
    } else {
      setError(true);
      setPin("");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 40 }}>
      <div style={{
        background: "var(--card-bg)",
        borderRadius: 16,
        padding: "32px 28px",
        border: "1px solid var(--border-subtle)",
        width: "100%",
        maxWidth: 320,
        textAlign: "center",
      }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>🔐</div>
        <div style={{ fontWeight: 800, fontSize: 18, color: "var(--text-primary)", marginBottom: 6 }}>My Picks</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>Enter your PIN to set your captain and Tier 2 choice</div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={e => { setPin(e.target.value.replace(/\D/g, "")); setError(false); }}
            placeholder="• • • •"
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "var(--card-inner-bg)",
              border: error ? "2px solid #ef4444" : "1px solid var(--border-subtle)",
              borderRadius: 10,
              padding: "12px 16px",
              fontSize: 22,
              letterSpacing: 8,
              color: "var(--text-primary)",
              textAlign: "center",
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: 8,
              outline: "none",
            }}
            autoFocus
          />
          {error && (
            <div style={{ fontSize: 12, color: "#ef4444", marginBottom: 12 }}>Incorrect PIN — try again</div>
          )}
          <button
            type="submit"
            disabled={pin.length !== 4}
            style={{
              width: "100%",
              background: pin.length === 4 ? "var(--accent)" : "var(--border-subtle)",
              color: pin.length === 4 ? "#1a1a2e" : "var(--text-muted)",
              border: "none",
              borderRadius: 10,
              padding: "12px",
              fontSize: 14,
              fontWeight: 800,
              cursor: pin.length === 4 ? "pointer" : "not-allowed",
              marginTop: 4,
              transition: "all 0.15s",
            }}
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
}

function MyPicksPanel({ player, onCaptainChange, onMechanismChange, onSignOut }) {
  const tier = TIER_COLORS;
  const selectStyle = {
    width: "100%",
    background: "var(--card-inner-bg)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-subtle)",
    borderRadius: 6,
    padding: "6px 10px",
    fontSize: 13,
    fontFamily: "inherit",
    cursor: "pointer",
    marginTop: 6,
    outline: "none",
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontWeight: 800, fontSize: 18, color: "var(--text-primary)" }}>
          👋 Hey, {player.name}
        </div>
        <button
          onClick={onSignOut}
          style={{ background: "none", border: "none", fontSize: 12, color: "var(--text-muted)", cursor: "pointer", textDecoration: "underline" }}
        >
          Not you? Sign out
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {player.teams.map(team => (
          <div key={team.name} style={{
            background: "var(--card-bg)",
            borderRadius: 14,
            border: "1px solid var(--border-subtle)",
            overflow: "hidden",
          }}>
            {/* Team header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px 10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 22 }}>{team.flag}</span>
                <span style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>{team.name}</span>
              </div>
              <span style={{
                fontSize: 9, fontWeight: 800, letterSpacing: 1,
                background: tier[team.tier].bg, color: tier[team.tier].text,
                padding: "2px 8px", borderRadius: 4,
              }}>{tier[team.tier].label}</span>
            </div>

            <div style={{ padding: "0 16px 14px", display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Mechanism row */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>⚡ Points mechanism</div>
                {team.tier === 2 ? (
                  <div style={{ display: "flex", border: "1px solid var(--border-subtle)", borderRadius: 8, overflow: "hidden" }}>
                    {["scored", "conceded"].map(opt => (
                      <button
                        key={opt}
                        onClick={() => onMechanismChange(player.id, team.name, opt)}
                        style={{
                          flex: 1,
                          padding: "8px 6px",
                          border: "none",
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all 0.15s",
                          background: team.mechanism === opt ? "var(--accent)" : "var(--card-inner-bg)",
                          color: team.mechanism === opt ? "#1a1a2e" : "var(--text-muted)",
                        }}
                      >
                        {opt === "scored" ? "⚽ Goals Scored" : "🥅 Goals Conceded"}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: 12, color: "var(--text-muted)", background: "var(--card-inner-bg)", borderRadius: 6, padding: "7px 10px" }}>
                    {team.tier === 1 ? "⚽ Goals Scored (fixed)" : "🥅 Goals Conceded (fixed)"}
                  </div>
                )}
              </div>

              {/* Captain row */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)" }}>©️ Captain</div>
                <select
                  value={team.captain}
                  onChange={e => onCaptainChange(player.id, team.name, e.target.value)}
                  style={selectStyle}
                >
                  <option value="">— Select captain —</option>
                  {team.squad.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsBar({ data }) {
  const topScorer = data.players.reduce((top, p) => p.totalPoints > top.totalPoints ? p : top, data.players[0]);

  return (
    <div style={{
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      marginBottom: 20,
    }}>
      {[
        { label: "MATCH DAY", value: data.matchDay, icon: "📅" },
        { label: "LEADER", value: topScorer.name, icon: "👑" },
        { label: "PLAYERS", value: data.players.length, icon: "👥" },
        { label: "PHASE", value: data.phase, icon: "🏟️" },
      ].map((stat) => (
        <div key={stat.label} style={{
          background: "var(--card-bg)",
          borderRadius: 10,
          padding: "12px 16px",
          border: "1px solid var(--border-subtle)",
          flex: "1 1 120px",
          minWidth: 120,
        }}>
          <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>
            {stat.icon} {stat.label}
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem("sweepstake_picks");
      return stored ? { ...SAMPLE_DATA, players: JSON.parse(stored) } : SAMPLE_DATA;
    } catch { return SAMPLE_DATA; }
  });
  const [currentPlayerId, setCurrentPlayerId] = useState(() => {
    const pid = sessionStorage.getItem("sweepstake_pid");
    return pid ? Number(pid) : null;
  });
  const [expandedPlayer, setExpandedPlayer] = useState(null);
  const [activeTab, setActiveTab] = useState("leaderboard");

  const updateCaptain = (playerId, teamName, captain) => {
    setData(prev => {
      const next = { ...prev, players: prev.players.map(p =>
        p.id !== playerId ? p : { ...p, teams: p.teams.map(t =>
          t.name !== teamName ? t : { ...t, captain }
        )}
      )};
      localStorage.setItem("sweepstake_picks", JSON.stringify(next.players));
      return next;
    });
  };

  const updateMechanism = (playerId, teamName, mechanism) => {
    setData(prev => {
      const next = { ...prev, players: prev.players.map(p =>
        p.id !== playerId ? p : { ...p, teams: p.teams.map(t =>
          t.name !== teamName ? t : { ...t, mechanism }
        )}
      )};
      localStorage.setItem("sweepstake_picks", JSON.stringify(next.players));
      return next;
    });
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("sweepstake_pid");
    setCurrentPlayerId(null);
  };

  const sortedPlayers = [...data.players].sort((a, b) => b.totalPoints - a.totalPoints);

  const lastUpdated = new Date(data.lastUpdated).toLocaleString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div style={{
      "--bg": "#0f1117",
      "--card-bg": "#1a1d28",
      "--card-inner-bg": "#12141d",
      "--text-primary": "#e8eaf0",
      "--text-muted": "#6b7280",
      "--accent": "#f59e0b",
      "--accent-dim": "#78350f",
      "--border-subtle": "#2a2d3a",
      fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
      background: "var(--bg)",
      minHeight: "100vh",
      color: "var(--text-primary)",
      padding: "0 0 40px",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a1d28 0%, #0f1117 100%)",
        borderBottom: "1px solid var(--border-subtle)",
        padding: "28px 24px 20px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "var(--text-muted)", marginBottom: 6 }}>
            FIFA WORLD CUP 2026
          </div>
          <h1 style={{
            fontSize: 32,
            fontWeight: 900,
            margin: 0,
            background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -0.5,
          }}>
            SWEEPSTAKE
          </h1>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 8 }}>
            Last updated: {lastUpdated}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        gap: 0,
        padding: "0 20px",
        marginTop: 16,
        marginBottom: 16,
        borderBottom: "1px solid var(--border-subtle)",
      }}>
        {["leaderboard", "matches", "activity", "picks"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: "none",
              border: "none",
              padding: "10px 20px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              color: activeTab === tab ? "var(--accent)" : "var(--text-muted)",
              borderBottom: activeTab === tab ? "2px solid var(--accent)" : "2px solid transparent",
              cursor: "pointer",
              textTransform: "uppercase",
              transition: "all 0.15s",
            }}
          >
            {tab === "leaderboard" ? "🏆 Leaderboard" : tab === "matches" ? "⚽ Matches" : tab === "activity" ? "📋 Activity" : "🎯 My Picks"}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px" }}>
        {activeTab === "leaderboard" && (
          <>
            <StatsBar data={data} />
            {sortedPlayers.map((player, i) => (
              <PlayerRow
                key={player.id}
                player={player}
                rank={i + 1}
                isExpanded={expandedPlayer === player.id}
                onToggle={() => setExpandedPlayer(expandedPlayer === player.id ? null : player.id)}
              />
            ))}
          </>
        )}

        {activeTab === "matches" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.recentMatches.map((match, i) => (
              <MatchCard key={i} match={match} />
            ))}
          </div>
        )}

        {activeTab === "activity" && (
          <ActivityFeed events={data.activityFeed} />
        )}

        {activeTab === "picks" && (
          currentPlayerId === null
            ? <PinGate players={data.players} onAuth={setCurrentPlayerId} />
            : <MyPicksPanel
                player={data.players.find(p => p.id === currentPlayerId)}
                onCaptainChange={updateCaptain}
                onMechanismChange={updateMechanism}
                onSignOut={handleSignOut}
              />
        )}
      </div>
    </div>
  );
}
