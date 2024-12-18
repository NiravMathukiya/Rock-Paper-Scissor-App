import { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import rock from "./assets/rock.png";
import paper from "./assets/paper.png";
import scissors from "./assets/scissor.png";

const choices = [
  { name: "rock", image: rock },
  { name: "paper", image: paper },
  { name: "scissors", image: scissors },
];

function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { width, height } = useWindowSize();

  const playGame = (choice) => {
    if (disabled) return;

    const userSelectedChoice = choices.find((item) => item.name === choice);
    const computerSelectedChoice =
      choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(userSelectedChoice);
    setComputerChoice(computerSelectedChoice);
    determineWinner(userSelectedChoice.name, computerSelectedChoice.name);
    setDisabled(true);
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      setResult("It's a draw!");
      setShowConfetti(false);
    } else if (
      (user === "rock" && computer === "scissors") ||
      (user === "scissors" && computer === "paper") ||
      (user === "paper" && computer === "rock")
    ) {
      setResult("You win!");
      setShowConfetti(true);
    } else {
      setResult("You lose!");
      setShowConfetti(false);
    }
    setShowModal(true);
  };

  const replayGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult("");
    setShowConfetti(false);
    setDisabled(false);
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-8">Rock, Paper, Scissors</h1>

      <div className="flex gap-6 mb-8">
        {choices.map((choice) => (
          <div
            key={choice.name}
            onClick={() => playGame(choice.name)}
            className={`cursor-pointer p-4 bg-white text-black rounded-lg shadow-md hover:scale-110 transition-transform ${disabled ? "pointer-events-none opacity-50" : ""
              }`}
          >
            <img src={choice.image} alt={choice.name} className="w-24 h-24" />
            <p className="text-center mt-2 capitalize">{choice.name}</p>
          </div>
        ))}
      </div>

      {userChoice && computerChoice && (
        <div className="flex gap-12 items-center mt-8">
          <div className="text-center">
            <p className="text-xl mb-4">Your Choice</p>
            <img
              src={userChoice.image}
              alt={userChoice.name}
              className="w-32 h-32 mx-auto"
            />
          </div>

          <div className="text-center">
            <p className="text-xl mb-4">Computer's Choice</p>
            <img
              src={computerChoice.image}
              alt={computerChoice.name}
              className="w-32 h-32 mx-auto"
            />
          </div>
        </div>
      )}

      {showConfetti && <Confetti width={width} height={height} />}

      {/* Modal for displaying the result */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg text-center shadow-lg">
            <h2
              className={`text-3xl font-bold mb-4 ${result.includes("win")
                  ? "text-green-500"
                  : result.includes("lose")
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
            >
              {result}
            </h2>
            <button
              onClick={replayGame}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
            >
              Replay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
