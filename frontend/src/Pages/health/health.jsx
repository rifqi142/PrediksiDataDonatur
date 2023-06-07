import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Health() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    async function fetchHealth() {
      const res = await axios.get("health");
      setHealth(res.data);
    }
    fetchHealth();
  }, []);

  console.log(health);
  return <div>{health}</div>;
}
