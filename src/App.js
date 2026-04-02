import React, { useState } from "react";
import "./styles.css";

// 1. ВЫНОСИМ СЦЕНУ КОМНАТЫ НАРУЖУ
const RoomScene = ({ setScene }) => (
  <div
    className="scene room"
    style={{
      backgroundImage:
        "url('https://dl.dropboxusercontent.com/scl/fi/1wnn90ebp4vfhz1q8rs24/mainwindow.jpg?rlkey=xvu2gpnu6b9uocg80rcvi1bus&st=kycj233m&raw=1')",
    }}
  >
    <div className="overlay-text">Вымпел: за гранью v0.1</div>

    <div
      className="monitor-trigger"
      onClick={() => setScene("desktop")}
      style={{
        top: "55%", // Расстояние от верхнего края (меняй это)
        left: "30%", // Расстояние от левого края (меняй это)
        width: "20%", // Ширина зоны (подгони под экран монитора)
        height: "19%", // Высота зоны
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="glow-effect"></div>
      <p style={{ margin: 0, fontSize: "25px", fontFamily: "bold" }}>ВХОД</p>
    </div>
  </div>
);

// 2. ВЫНОСИМ РАБОЧИЙ СТОЛ НАРУЖУ
const DesktopScene = ({
  user,
  setUser,
  activeWindow,
  setActiveWindow,
  setScene,
  currentQuestion,
  setCurrentQuestion,
  achievements,
  questions, // <-- ДОБАВЬ ЭТУ СТРОЧКУ
  score, // <-- И ЭТУ (если хочешь отображать баллы там)
  setScore,
}) => {
  return (
    <div
      className="scene desktop"
      style={{
        backgroundImage:
          "url('https://dl.dropboxusercontent.com/scl/fi/q6finbhh7zimq4uyrv7j7/window3.png?rlkey=wfncowvfuymcq8loqtxtfd590&st=bxfuanim&raw=1')",
      }}
    >
      {/* ИКОНКИ (Зоны клика) */}
      <div
        className="icon-zone"
        style={{ top: "8%", left: "42%", width: "8%", height: "12%" }}
        onClick={() => setActiveWindow("profile")}
      ></div>
      <div
        className="icon-zone"
        style={{ top: "8%", left: "52%", width: "8%", height: "12%" }}
        onClick={() => setActiveWindow("register")}
      ></div>

      <div
        className="icon-zone"
        style={{ top: "20%", left: "52%", width: "8%", height: "12%" }}
        onClick={() => setActiveWindow("achievements")}
      ></div>
      <div
        className="icon-zone"
        style={{ top: "8%", left: "32%", width: "8%", height: "12%" }}
        onClick={() => setActiveWindow("video")}
      ></div>
      <div
        className="icon-zone"
        style={{ bottom: "68%", left: "42%", width: "8%", height: "10%" }}
        onClick={() => setScene("room")}
      ></div>

      {activeWindow === "register" && (
        <div className="window" style={{ width: "320px" }}>
          <div className="window-header">
            <span>New_User_Wizard.exe</span>
            <button onClick={() => setActiveWindow(null)}>X</button>
          </div>
          <div className="window-content">
            <div style={{ marginBottom: "15px" }}>
              <p style={{ margin: "5px 0" }}>Имя (Позывной):</p>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Username..."
                style={{ width: "100%", fontFamily: "inherit" }}
              />

              <p style={{ margin: "5px 0" }}>Фамилия:</p>
              <input
                type="text"
                value={user.surname}
                onChange={(e) => setUser({ ...user, surname: e.target.value })}
                placeholder="Surname..."
                style={{ width: "100%", fontFamily: "inherit" }}
              />

              <p style={{ margin: "5px 0" }}>E-mail:</p>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="mail@example.com"
                style={{ width: "100%", fontFamily: "inherit" }}
              />

              <p style={{ margin: "5px 0" }}>Возраст:</p>
              <input
                type="number"
                value={user.age}
                onChange={(e) => setUser({ ...user, age: e.target.value })}
                placeholder="20"
                style={{ width: "100%", fontFamily: "inherit" }}
              />
            </div>

            <button
              onClick={() => setActiveWindow("profile")}
              style={{ width: "100%", padding: "5px", cursor: "pointer" }}
            >
              СОЗДАТЬ ПРОФИЛЬ
            </button>
          </div>
        </div>
      )}

      {activeWindow === "profile" && (
        <div className="window" style={{ width: "400px" }}>
          <div className="window-header">
            <span>User_Profile.sys</span>
            <button onClick={() => setActiveWindow(null)}>X</button>
          </div>
          <div
            className="window-content"
            style={{ display: "flex", gap: "20px" }}
          >
            <div
              style={{
                fontSize: "60px",
                border: "2px inset #eee",
                background: "#c0c0c0",
                padding: "15px",
                display: "flex",
                alignItems: "center",
              }}
            >
              👤
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 5px 0" }}>
                {user.name} {user.surname || "Гость"}
              </h3>
              <p style={{ fontSize: "14px", margin: "2px 0" }}>
                <b>ID:</b> {user.email || "не указан"}
              </p>
              <p style={{ fontSize: "14px", margin: "2px 0" }}>
                <b>Возраст:</b> {user.age || "??"} лет
              </p>
              <hr />
              <p style={{ margin: "5px 0" }}>Статус: Оператор </p>
              <p style={{ margin: "5px 0" }}>Уровень: {user.level}</p>

              {/* Полоска опыта */}
              <div
                style={{
                  width: "100%",
                  height: "12px",
                  border: "1px solid #000",
                  background: "#eee",
                  marginTop: "5px",
                }}
              >
                <div
                  style={{
                    width: `${user.xp}%`,
                    height: "100%",
                    background: "#00ff00",
                    boxShadow: "inset 1px 1px 1px #fff",
                  }}
                ></div>
              </div>
              <p style={{ fontSize: "11px", textAlign: "right" }}>
                XP: {user.xp}/100
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ОКНО ДОСТИЖЕНИЙ */}
      {activeWindow === "achievements" && (
        <div className="window" style={{ width: "400px" }}>
          <div className="window-header">
            <span>Wall_of_Fame.exe</span>
            <button onClick={() => setActiveWindow(null)}>X</button>
          </div>
          <div
            className="window-content"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {achievements.map((ach) => (
              <div
                key={ach.id}
                style={{
                  border: "1px inset #fff",
                  padding: "5px",
                  background: ach.done ? "#c0c0c0" : "#808080",
                  filter: ach.done ? "none" : "grayscale(1)",
                }}
              >
                <div style={{ fontSize: "24px" }}>{ach.icon}</div>
                <b style={{ fontSize: "14px" }}>{ach.title}</b>
                <p style={{ fontSize: "10px", margin: "2px 0" }}>{ach.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ОКНО ВИДЕОУРОКОВ (тот самый "видеохостинг") */}

      {activeWindow === "video" && (
        <div
          className="window video-browser"
          style={{ width: "90%", maxWidth: "800px" }}
        >
          <div className="window-header">
            <span>Education_v0.1</span>

            <button onClick={() => setActiveWindow(null)}>X</button>
          </div>

          <div
            className="window-content"
            style={{
              display: "grid",

              gridTemplateColumns: "1fr 2fr",

              gap: "15px",
            }}
          >
            {/* ЛЕВАЯ КОЛОНКА: Сетка видео */}

            <div
              className="video-grid"
              style={{ overflowY: "auto", maxHeight: "400px" }}
            >
              <div
                className="video-card active"
                style={{
                  border: "2px solid #00ff00",

                  padding: "5px",

                  marginBottom: "10px",
                }}
              >
                <div
                  className="video-preview"
                  style={{ background: "#000", height: "60px" }}
                >
                  ▶
                </div>

                <p>1 урок</p>
              </div>

              {/* Заглушки для будущих видео */}

              {[2, 3, 4].map((num) => (
                <div
                  key={num}
                  className="video-card locked"
                  style={{
                    opacity: 0.5,

                    padding: "5px",

                    border: "1px solid #808080",

                    marginBottom: "10px",
                  }}
                >
                  <div
                    className="video-preview"
                    style={{ background: "#333", height: "60px" }}
                  >
                    🔒
                  </div>

                  <p>{num}. Урок в разработке</p>
                </div>
              ))}
            </div>

            {/* ПРАВАЯ КОЛОНКА: Плеер */}

            <div className="player-section">
              <video
                width="100%"
                controls
                style={{ background: "#000", boxShadow: "0 0 10px #00ff00" }}
              >
                <source
                  src="https://dl.dropboxusercontent.com/scl/fi/xiexsozwvfk2dwzar1pir/video1.mp4?rlkey=wgfl2c4fp51vuhyuwkczt5czf&st=61qbgx02&dl=0"
                  type="video/mp4"
                />
              </video>

              <div style={{ marginTop: "10px" }}>
                <button
                  className="test-start-btn"
                  onClick={() => setActiveWindow("quiz")}
                  style={{
                    width: "100%",

                    padding: "12px",

                    background: "#00ff00",

                    color: "#000",

                    cursor: "pointer",

                    fontWeight: "bold",
                  }}
                >
                  ПЕРЕЙТИ К ТЕСТУ (4 ВОПРОСА)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeWindow === "quiz" && (
        <div
          className="window quiz-window"
          style={{
            width: "400px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="window-header">
            <span>Knowledge_Check_Module</span>
            <button
              onClick={() => {
                setActiveWindow("video");
                setCurrentQuestion(0);
                setScore(0);
              }}
            >
              Назад
            </button>
          </div>

          <div className="window-content">
            {currentQuestion < questions.length ? (
              <div className="question-step">
                <p style={{ color: "#000080", fontWeight: "bold" }}>
                  Вопрос {currentQuestion + 1} из {questions.length}
                </p>

                <h3 style={{ minHeight: "60px", marginBottom: "15px" }}>
                  {questions[currentQuestion].title}
                </h3>

                <div
                  className="options"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        // Если выбрали правильный индекс — добавляем балл
                        if (index === questions[currentQuestion].correct) {
                          setScore(score + 1);
                        }
                        // Переходим к следующему вопросу
                        setCurrentQuestion(currentQuestion + 1);
                      }}
                      style={{ textAlign: "left", padding: "5px 10px" }}
                    >
                      {index === 0 ? "А" : index === 1 ? "Б" : "В"}: {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="quiz-result" style={{ textAlign: "center" }}>
                <h2
                  style={{
                    color: score === questions.length ? "#00aa00" : "#000",
                  }}
                >
                  ТЕСТ ЗАВЕРШЕН!
                </h2>
                <div
                  style={{
                    margin: "20px 0",
                    border: "2px inset #fff",
                    padding: "10px",
                    background: "#eee",
                  }}
                >
                  <p>Ваш результат:</p>
                  <h1 style={{ fontSize: "40px", margin: "10px 0" }}>
                    {score} / {questions.length}
                  </h1>
                  <p>
                    {score === questions.length
                      ? "Вы — Гений!"
                      : "Хороший результат, но можно лучше!"}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveWindow("video");
                    setCurrentQuestion(0);
                    setScore(0);
                  }}
                >
                  ВЕРНУТЬСЯ К УРОКАМ
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ОСНОВНОЙ КОМПОНЕНТ
export default function App() {
  const [scene, setScene] = useState("room");
  const [activeWindow, setActiveWindow] = useState(null);
  const [score, setScore] = useState(0); // Состояние для хранения баллов

  const questions = [
    {
      title:
        "Почему автор считает некорректным оценивать женских персонажей только по их внешности?",
      options: [
        "Красота - понятие субъективное, и важнее оценивать внутренние качества и характер персонажа.",
        "Современные графические технологии не позволяют передать истинную красоту, поэтому акцент смещается на текст.",
        "Внешность персонажа должна меняться в зависимости от выбора игрока, поэтому она не может быть константой для оценки.",
      ],
      correct: 0,
    },
    {
      title:
        "Какие ключевые качества делают Клементину из «Ходячих мертвецов» таким запоминающимся персонажем?",
      options: [
        "Свое развитие от ребенка до взрослого человека на глазах у игроков.",
        "Её исключительные навыки владения огнестрельным оружием с самых первых эпизодов игры.",
        "Постоянный оптимизм и вера в то, что мир скоро вернется в прежнее состояние.",
      ],
      correct: 0,
    },
    {
      title:
        "В чём заключается особая ценность Дианы Бернвуд как персонажа-напарника в серии игр Hitman??",
      options: [
        "Профессионализм и хладнокровие.",
        "Она лично участвует в перестрелках, прикрывая Агента 47 на поле боя.",
        "Диана является единственным персонажем, который знает все генетические секреты создания клонов.",
      ],
      correct: 0,
    },
    {
      title:
        "Как Марсия Бартолотти (Вендетта) смогла превратиться из бездомной девушки в значимого персонажа Overwatch?",
      options: [
        "Несгибаемая воля и решимость.",
        "Благодаря случайному обнаружению секретного склада высокотехнологичного оружия",
        "Она выиграла грант на обучение в академии.",
      ],
      correct: 0,
    },
  ];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [user, setUser] = useState({
    name: "",
    surname: "", // Фамилия
    email: "", // Почта
    age: "", // Возраст
    level: 1,
    xp: 0,
  });
  const [achievements] = useState([
    {
      id: 1,
      title: "Первые шаги",
      desc: "Включил компьютер",
      icon: "🔌",
      done: true,
    },
    {
      id: 2,
      title: "Кибер-зритель",
      desc: "Посмотрел выпуск",
      icon: "📺",
      done: false,
    },
    { id: 3, title: "Эксперт", desc: "Прошел тест", icon: "🏆", done: false },
  ]);
  const OrientationLock = () => (
    <div className="orientation-lock">
      <div className="lock-content">
        <div className="phone-icon">📱🔄</div>
        <h2>Пожалуйста, переверните устройство</h2>
        <p>Для погружения необходим горизонатльный(альбомный) режим</p>
      </div>
    </div>
  );
  return (
    <div className="App">
      <OrientationLock /> {/* Этот блок будет управляться через CSS */}
      {scene === "room" ? (
        <RoomScene setScene={setScene} />
      ) : (
        <DesktopScene
          user={user}
          setUser={setUser}
          activeWindow={activeWindow}
          setActiveWindow={setActiveWindow}
          setScene={setScene}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          achievements={achievements}
          questions={questions} // <-- ДОБАВЬ ЭТУ СТРОЧКУ
          score={score} // <-- И ЭТУ (если хочешь отображать баллы там)
          setScore={setScore}
        />
      )}
    </div>
  );
}
