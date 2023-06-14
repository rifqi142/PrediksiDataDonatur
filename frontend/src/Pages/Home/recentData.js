import React from "react";
import { Card, Button } from "react-bootstrap";

export const RecentData = ({ recentData }) => {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{recentData.judul}</Card.Title>
          <Card.Text>
            {recentData.hasil === 0 ? (
              <p></p>
            ) : (
              <Button variant="success">Lihat Hasil</Button>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
