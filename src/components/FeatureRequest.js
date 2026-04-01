import React, { useState } from "react";

function FeatureRequest() {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text) return alert("Enter something");

    const old = JSON.parse(localStorage.getItem("requests")) || [];
    localStorage.setItem("requests", JSON.stringify([...old, text]));

    alert("Request submitted ✅");
    setText("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Feature Request / Issue</h2>

      <textarea
        placeholder="Enter your issue or feature..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "300px", height: "100px" }}
      />

      <br /><br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default FeatureRequest;