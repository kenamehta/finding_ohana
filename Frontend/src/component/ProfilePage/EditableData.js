import React, { useEffect, useState } from "react";
import { BsPencilFill, BsCheckLg } from "react-icons/bs";
import { Row, Col, InputGroup, FormControl, Container } from "react-bootstrap";
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
  const isBio = fieldName === "bio";
  const isHobbyOrInterest = fieldName === "hobby" || fieldName === "interest";
  return (
    <>
      {isEdit ? (
        <InputGroup>
          <Container>
            <Row
              className={"pt-2" + (isBio ? " border-box-bio" : " border-box")}
            >
              <Col sm={isBio ? 2 : 4} className="medium-block">
                {attribute + ": "}
              </Col>
              <Col
                sm={isSelf ? (isBio ? 9 : 6) : isBio ? 10 : 8}
                className={isBio ? "small-block" : "medium-block"}
              >
                {isBio || isHobbyOrInterest ? (
                  <FormControl
                    as="textarea"
                    rows="6"
                    aria-label={value}
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />
                ) : (
                  <FormControl
                    aria-label={value}
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />
                )}
              </Col>
              {isSelf ? (
                <Col sm={isBio ? 1 : 2} align="right" className="pr-0">
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
          </Container>
        </InputGroup>
      ) : (
        <Container>
          <Row className={"pt-2" + (isBio ? " border-box-bio" : " border-box")}>
            <Col sm={isBio ? 2 : 4} className="medium-block">
              {attribute + ": "}
            </Col>
            <Col
              sm={isSelf ? (isBio ? 9 : 6) : isBio ? 10 : 8}
              className={isBio ? "small-block" : "medium-block"}
            >
              {data}
            </Col>
            {isSelf ? (
              <Col sm={isBio ? 1 : 2} align="right" className="pr-0">
                <BsPencilFill
                  className="edit-button"
                  onClick={() => {
                    setIsEdit(true);
                  }}
                />
              </Col>
            ) : null}
          </Row>
        </Container>
      )}
    </>
  );
}
