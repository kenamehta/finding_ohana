import React, { useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { Row, Col } from "react-bootstrap";
import "./style.css";

export default function EditableData({ attribute, data, isSelf, blockSize }) {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      {isEdit ? null : (
        <Row className="border-box pt-2">
          <Col sm={4} className={blockSize}>
            {attribute + ": "}
          </Col>
          <Col sm={isSelf ? 6 : 8} className={blockSize}>
            {data}
          </Col>
          {isSelf ? (
            <Col sm={2} align="right" className="pr-0">
              <BsPencilFill
                className="edit-button"
                onClick={() => {
                  setIsEdit(true);
                }}
              />
            </Col>
          ) : null}
        </Row>
      )}
    </>
  );
}
