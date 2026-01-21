//function App() {
  //return (
    //<div>
      //<h1>Hello Cresvia 🚀</h1>
      //<p>This is my first React app.</p>
    //</div>
  //)
//}

//export default App

//import Header from "./components/Header"

//unction App() {
  //return (
   // <div>
     // <Header />
      //<p>This is my first React project step by step.</p>
    //</div>
  //)
//}

//export default App;

//import Header from "./components/Header";
import { supabase } from "./supabase";

//function App() {
  //console.log("Supabase:", supabase);

  //return (
    //<div>
      //<Header />
      //<h1>React is Working ✅</h1>
      //<h2>Supabase Connected ✅</h2>
    //</div>
 // );
//}

//export default App;

// import { useEffect, useState } from "react";
// import { getLeaderboard } from "./services/leaderboardService";

// function App() {
//   const [leaderboard, setLeaderboard] = useState([]);

//   useEffect(() => {
//     getLeaderboard().then(data => setLeaderboard(data));
//   }, []);

//   return (
//     <div>
//       <h1>Leaderboard</h1>
//       {leaderboard.map(user => (
//         <div key={user.name}>
//           {user.name} - XP: {user.xp}, Streak: {user.streak}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;


import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <div>
      <Leaderboard />
    </div>
  );
}

export default App;
