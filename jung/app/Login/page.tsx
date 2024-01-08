"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

export default function input() {
  const [name, setName] = useState("");
  const [id, setid] = useState("");
  const [password, setPassword] = useState("");
  const [massage, setMassage] = useState("");

  const handleJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const respones = await fetch("/input", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, id, password }),
      });

      if (respones.ok) {
        setMassage("회원가입이 완료되었습니다.");
      } else {
        setMassage("회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMassage("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h1>homeTag</h1>
      <form onSubmit={handleJoin}>
        <input
          className="text-black"
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          className="text-black"
          type="text"
          placeholder="id"
          value={id}
          onChange={(e) => setid(e.target.value)}
        />
        <br />
        <input
          className="text-black"
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">submit</button>
        {massage && <p>{massage}</p>}
      </form>
    </div>
  );
}
