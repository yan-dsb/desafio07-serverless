import { document } from './../utils/dynamodbClient';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuuid } from 'uuid';

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body);

  await document.put({
    TableName: 'users_todos',
    Item: {
      id: uuuid(),
      user_id,
      done: false,
      title,
      deadline: new Date(deadline).toISOString()
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Todo created'
    })
  };
};
