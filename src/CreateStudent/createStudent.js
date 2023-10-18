const ULID = require("ulid");

const { DYNAMODB } = process.env;
const { createItem } = require("../ddb-helpers");

exports.handler = async event => {
  const id = ULID.ulid();

  const params = {
    TableName: DYNAMODB,
    Item: {
      id,
      name: event.input.name,
      age: event.input.age,
      subject: event.input.subject,
      grade: event.input.grade
    }
  };

  try {
    await createItem(params);
    return {
      statusCode: 201,
      body: params.Item
    };
  } catch (err) {
    console.log("err-", err);
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    };
  }
};