import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const AdminAI = () => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Welcome Admin.\n\nI can help you analyze bookings, revenue, cars, users, and business performance.",
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const askAI = async () => {
    if (!question.trim()) return;

    const currentQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: currentQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://car-rental-backend-7bgb.onrender.com/agent/",
        {
          question: currentQuestion,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: res.data.answer,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "Unable to connect with AI Assistant.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      <style>
        {`
          *{
            box-sizing:border-box;
          }

          .admin-ai-page{
            min-height:100vh;
            background:#0a0a0a;
            color:white;
          }

          .chat-container{
            background:#111;
            border:1px solid rgba(255,215,0,.15);
            border-radius:20px;
            overflow:hidden;
            height:calc(100vh - 160px);
            min-height:500px;
            display:flex;
            flex-direction:column;
          }

          .chat-body{
            flex:1;
            overflow-y:auto;
            overflow-x:hidden;
            padding:20px;
            scroll-behavior:smooth;
          }

          .chat-body::-webkit-scrollbar{
            width:6px;
          }

          .chat-body::-webkit-scrollbar-track{
            background:#111;
          }

          .chat-body::-webkit-scrollbar-thumb{
            background:#FFD700;
            border-radius:20px;
          }

          .chat-body::-webkit-scrollbar-thumb:hover{
            background:#ffdf4d;
          }

          .user-message{
            background:#FFD700;
            color:#000;
            padding:14px 18px;
            border-radius:18px;
            width:fit-content;
            max-width:90%;
            margin-left:auto;
            font-weight:600;
            white-space:pre-wrap;
            word-break:break-word;
          }

          .ai-message{
            background:#1d1d1d;
            color:#fff;
            padding:14px 18px;
            border-radius:18px;
            width:fit-content;
            max-width:90%;
            white-space:pre-wrap;
            word-break:break-word;
          }

          .chat-footer{
            border-top:1px solid rgba(255,255,255,.08);
            padding:15px;
            background:#111;
          }

          .custom-input{
            background:#1f1f1f !important;
            border:1px solid #333 !important;
            color:white !important;
            min-height:52px;
          }

          .custom-input::placeholder{
            color:#888;
          }

          .send-btn{
            background:#FFD700;
            color:black;
            border:none;
            font-weight:700;
            min-width:120px;
          }

          .send-btn:hover{
            background:#ffdf4d;
          }

          @media(max-width:768px){

            .chat-container{
              height:calc(100vh - 140px);
              border-radius:15px;
            }

            .chat-footer .row{
              flex-direction:column;
            }

            .send-btn{
              width:100%;
              margin-top:10px;
            }

            .user-message,
            .ai-message{
              max-width:95%;
              font-size:14px;
            }
          }
        `}
      </style>

      <div className="admin-ai-page">

        {/* Header */}
        <div
          style={{
            background: "#000",
            borderBottom: "2px solid #FFD700",
          }}
        >
          <div className="container-fluid py-3 px-4">
            <div className="d-flex justify-content-between align-items-center">

              <h3
                className="fw-bold m-0"
                style={{
                  color: "#FFD700",
                }}
              >
                Royal Route Assistant
              </h3>

              <span
                className="badge"
                style={{
                  background: "#FFD700",
                  color: "#000",
                  fontSize: "13px",
                }}
              >
                Admin AI
              </span>

              <button onClick={() => {
                window.location.href = "/admin/admin-dashboard";
              }}
                className="btn btn-outline-light"
                style={{
                  background: "#FFD700",
                  color: "#000",
                  fontWeight: "600",
                  borderRadius: "8px",
                }}
              >
                Dashboard
              </button>

            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="container-fluid py-3">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-10">

              <div className="chat-container">

                {/* Messages */}
                <div className="chat-body">

                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-3 d-flex ${
                        msg.type === "user"
                          ? "justify-content-end"
                          : "justify-content-start"
                      }`}
                    >
                      <div
                        className={
                          msg.type === "user"
                            ? "user-message"
                            : "ai-message"
                        }
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="mb-3">
                      <div className="ai-message">
                        AI is thinking...
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef}></div>

                </div>

                {/* Input */}
                <div className="chat-footer">

                  <div className="row g-2">

                    <div className="col-md">
                      <input
                        type="text"
                        className="form-control custom-input"
                        placeholder="Ask about bookings, revenue, cars, customers..."
                        value={question}
                        onChange={(e) =>
                          setQuestion(e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            askAI();
                          }
                        }}
                      />
                    </div>

                    <div className="col-md-auto">
                      <button
                        className="btn send-btn h-100 px-4"
                        onClick={askAI}
                        disabled={loading}
                      >
                        {loading
                          ? "Sending..."
                          : "Send"}
                      </button>
                    </div>

                  </div>

                  <small
                    className="d-block mt-2"
                    style={{
                      color: "#777",
                    }}
                  >
                    Ask about bookings, revenue, pending requests,
                    top-performing cars, and business insights.
                  </small>

                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default AdminAI;