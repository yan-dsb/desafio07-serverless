import { document } from './../utils/dynamodbClient';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;

  const response = await document.scan({
    TableName: 'users_todos',
    FilterExpression: 'user_id = :user_id',
    ExpressionAttributeValues: {
      ":user_id": user_id
    }
  }).promise();

  const todos = response.Items;

  return {
    statusCode: 201,
    body: JSON.stringify({
      todos
    })
  };
};
