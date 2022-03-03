resource "aws_lambda_function" "alexa_health_recorder" {
  function_name = "alexa_health_recorder"
  role          = aws_iam_role.lambda.arn
  architectures = ["arm64"]
  handler       = "lambda/index.handler"
  runtime       = "nodejs14.x"
  environment {
    variables = {
      "DATA_SOURCE_ID" : var.DATA_SOURCE_ID
      "OAUTH2_CLIENT_ID" : var.OAUTH2_CLIENT_ID
      "OAUTH2_CLIENT_SECRET" : var.OAUTH2_CLIENT_SECRET
      "OAUTH2_REDIRECT_URI" : var.OAUTH2_REDIRECT_URI
      "REFRESH_TOKEN" : var.REFRESH_TOKEN
    }
  }
}

resource "aws_lambda_permission" "alexa_skill_kit" {
  action             = "lambda:InvokeFunction"
  event_source_token = "amzn1.ask.skill.aa14622c-2745-429a-82b9-a96fc3ac2cae"
  function_name      = "arn:aws:lambda:ap-northeast-1:314704858643:function:alexa_health_recorder"
  principal          = "alexa-appkit.amazon.com"
}

resource "aws_iam_role" "lambda" {
  assume_role_policy = "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Action\":\"sts:AssumeRole\"}]}"
  name               = "alexa_health_recorder-role-liderws9"
  path               = "/service-role/"
  managed_policy_arns = [
    aws_iam_policy.lambda_basic_execution.arn
  ]
}

resource "aws_iam_policy" "lambda_basic_execution" {
  policy = "{\"Statement\":[{\"Action\":\"logs:CreateLogGroup\",\"Effect\":\"Allow\",\"Resource\":\"arn:aws:logs:ap-northeast-1:314704858643:*\"},{\"Action\":[\"logs:CreateLogStream\",\"logs:PutLogEvents\"],\"Effect\":\"Allow\",\"Resource\":[\"arn:aws:logs:ap-northeast-1:314704858643:log-group:/aws/lambda/alexa_health_recorder:*\"]}],\"Version\":\"2012-10-17\"}"
  path   = "/service-role/"
  name   = "AWSLambdaBasicExecutionRole-f318349d-ae3e-458d-b348-f3ae764983ff"
}
