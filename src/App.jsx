import { useState } from "react";

// Sample data simulating the JSON structure
const SAMPLE_DATA = {
  lastUpdated: "2026-06-15T07:00:00Z",
  matchDay: 5,
  tournament: "FIFA World Cup 2026",
  phase: "Group Stage",
  players: [
    {
      id: 1, name: "Tim H", totalPoints: 18,
      teams: [
        { name: "England", tier: 1, flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", mechanism: "scored", captain: "Harry Kane", points: 8, goals: 5, captainGoals: 1, ownGoals: 0, yellows: 1, reds: 0 },
        { name: "Mexico", tier: 2, flag: "🇲🇽", mechanism: "conceded", captain: "Raúl Jiménez", points: 4, goals: 4, captainGoals: 0, ownGoals: 0, yellows: 2, reds: 0 },
        { name: "Saudi Arabia", tier: 3, flag: "🇸🇦", mechanism: "conceded", captain: "Salem Al-Dawsari", points: 6, goals: 7, captainGoals: 0, ownGoals: 1, yellows: 1, reds: 0 },
      ]
    },
    {
      id: 2, name: "Sarah K", totalPoints: 15,
      teams: [
        { name: "France", tier: 1, flag: "🇫🇷", mechanism: "scored", captain: "Kylian Mbappé", points: 10, goals: 6, captainGoals: 2, ownGoals: 0, yellows: 0, reds: 0 },
        { name: "USA", tier: 2, flag: "🇺🇸", mechanism: "scored", captain: "Christian Pulisic", points: 3, goals: 3, captainGoals: 0, ownGoals: 0, yellows: 1, reds: 0 },
        { name: "Costa Rica", tier: 3, flag: "🇨🇷", mechanism: "conceded", captain: "Keylor Navas", points: 2, goals: 5, captainGoals: 0, ownGoals: 0, yellows: 3, reds: 0 },
      ]
    },
    {
      id: 3, name: "Dave M", totalPoints: 14,
      teams: [
        { name: "Brazil", tier: 1, flag: "🇧🇷", mechanism: "scored", captain: "Vinícius Jr", points: 9, goals: 5, captainGoals: 2, ownGoals: 0, yellows: 3, reds: 0 },
        { name: "South Korea", tier: 2, flag: "🇰🇷", mechanism: "scored", captain: "Son Heung-min", points: 4, goals: 4, captainGoals: 0, ownGoals: 0, yellows: 2, reds: 0 },
        { name: "New Zealand", tier: 3, flag: "🇳🇿", mechanism: "conceded", captain: "Chris Wood", points: 1, goals: 6, captainGoals: 0, ownGoals: 1, yellows: 2, reds: 0 },
      ]
    },
    {
      id: 4, name: "Laura P", totalPoints: 12,
      teams: [
        { name: "Argentina", tier: 1, flag: "🇦🇷", mechanism: "scored", captain: "Lionel Messi", points: 7, goals: 4, captainGoals: 1, ownGoals: 0, yellows: 2, reds: 0 },
        { name: "Japan", tier: 2, flag: "🇯🇵", mechanism: "conceded", captain: "Takumi Minamino", points: 3, goals: 3, captainGoals: 0, ownGoals: 0, yellows: 1, reds: 0 },
        { name: "Tunisia", tier: 3, flag: "🇹🇳", mechanism: "conceded", captain: "Youssef Msakni", points: 2, goals: 4, captainGoals: 0, ownGoals: 0, yellows: 2, reds: 0 },
      ]
    },
    {
      id: 5, name: "Chris W", totalPoints: 11,
      teams: [
        { name: "Germany", tier: 1, flag: "🇩🇪", mechanism: "scored", captain: "Florian Wirtz", points: 6, goals: 4, captainGoals: 1, ownGoals: 0, yellows: 1, reds: 0 },
        { name: "Ecuador", tier: 2, flag: "🇪🇨", mechanism: "scored", captain: "Moisés Caicedo", points: 2, goals: 2, captainGoals: 0, ownGoals: 0, yellows: 1, reds: 0 },
        { name: "Canada", tier: 3, flag: "🇨🇦", mechanism: "conceded", captain: "Alphonso Davies", points: 3, goals: 5, captainGoals: 0, ownGoals: 0, yellows: 2, reds: 0 },
      ]
    },
    {
      id: 6, name: "Priya R", totalPoints: 10,
      teams: [
        { name: "Spain", tier: 1, flag: "🇪🇸", mechanism: "scored", captain: "Lamine Yamal", points: 5, goals: 3, captainGoals: 1, ownGoals: 0, yellows: 1, reds: 0 },
        { name: "Serbia", tier: 2, flag: "🇷🇸", mechanism: "conceded", captain: "Dušan Vlahović", points: 4, goals: 5, captainGoals: 0, ownGoals: 0, yellows: 1, reds: 0 },
        { name: "IR Iran", tier: 3, flag: "🇮🇷", mechanism: "conceded", captain: "Mehdi Taremi", points: 1, goals: 4, captainGoals: 0, ownGoals: 0, yellows: 3, reds: 0 },
      ]
    },
    {
      id: 7, name: "James B", totalPoints: 8,
      teams: [
        { name: "Portugal", tier: 1, flag: "🇵🇹", mechanism: "scored", captain: "Cristiano Ronaldo", points: 4, goals: 3, captainGoals: 0, ownGoals: 0, yellows: 2, reds: 0 },
        { name: "Cameroon", tier: 2, flag: "🇨🇲", mechanism: "conceded", captain: "André-Frank Zambo Anguissa", points: 3, goals: 4, captainGoals: 0, ownGoals: 0, yellows: 1, reds: 0 },
        { name: "Qatar", tier: 3, flag: "🇶🇦", mechanism: "conceded", captain: "Akram Afif", points: 1, goals: 6, captainGoals: 0, ownGoals: 1, yellows: 2, reds: 0 },
      ]
    },
    {
      id: 8, name: "Meg T", totalPoints: 6,
      teams: [
        { name: "Netherlands", tier: 1, flag: "🇳🇱", mechanism: "scored", captain: "Cody Gakpo", points: 3, goals: 2, captainGoals: 0, ownGoals: 0, yellows: 1, reds: 0 },
        { name: "Ghana", tier: 2, flag: "🇬🇭", mechanism: "scored", captain: "Mohammed Kudus", points: 2, goals: 2, captainGoals: 0, ownGoals: 0, yellows: 0, reds: 0 },
        { name: "Honduras", tier: 3, flag: "🇭🇳", mechanism: "conceded", captain: "Alberth Elis", points: 1, goals: 3, captainGoals: 0, ownGoals: 0, yellows: 2, reds: 0 },
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
  ]
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
  const [data] = useState(SAMPLE_DATA);
  const [expandedPlayer, setExpandedPlayer] = useState(null);
  const [activeTab, setActiveTab] = useState("leaderboard");

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
        {["leaderboard", "matches"].map((tab) => (
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
            {tab === "leaderboard" ? "🏆 Leaderboard" : "⚽ Recent Matches"}
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
      </div>
    </div>
  );
}
