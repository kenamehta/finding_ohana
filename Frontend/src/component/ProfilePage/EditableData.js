import React, { useEffect, useState } from "react";
import { BsPencilFill, BsCheckLg } from "react-icons/bs";
import { Row, Col, InputGroup, FormControl } from "react-bootstrap";
import "./style.css";

export default function EditableData({
  attribute,
  data,
  isSelf,
  updateDetails,
  fieldName,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(data);
  }, [data]);

  return (
    <>
      {isEdit ? (
        <InputGroup>
          <Row className="border-box pt-2">
            <Col sm={4} className="medium-block">
              {attribute + ": "}
            </Col>
            <Col sm={isSelf ? 6 : 8} className="medium-block">
              <FormControl
                aria-label={value}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </Col>
            {isSelf ? (
              <Col sm={2} align="right" className="pr-0">
                <BsCheckLg
                  className="edit-button"
                  onClick={() => {
                    updateDetails(fieldName, value);
                    setIsEdit(false);
                  }}
                />
              </Col>
            ) : null}
          </Row>
        </InputGroup>
      ) : (
        <Row className="border-box pt-2">
          <Col sm={4} className="medium-block">
            {attribute + ": "}
          </Col>
          <Col sm={isSelf ? 6 : 8} className="medium-block">
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
