import "dotenv/config";

const JUDGE0_URL = process.env.JUDGE0_API_URL!;

export const LANGUAGES = {
  javascript: 63,
  python: 71,
  cpp: 54,
  java: 62,
  c: 50,
};

const submitCode = async (
  sourceCode: string,
  languageId: number,
  expectedOutput: string
) => {
  const response = await fetch(
    `${JUDGE0_URL}/submissions?base64_encoded=false&wait=false`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_code: sourceCode,
        language_id: languageId,
        expected_output: expectedOutput,
      }),
    }
  );

  const data = await response.json();

  if (!data.token) {
    throw new Error(JSON.stringify(data));
  }

  return data.token;
};

const getResult = async (token: string) => {
  const response = await fetch(
    `${JUDGE0_URL}/submissions/${token}?base64_encoded=false`
  );

  return response.json();
};

const generateWrapper = (
  userCode: string,
  input: string,
  functionName: string
) => {
  const args = input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

    console.log("args : " , ...args)
  return `
${userCode}

const args = [
${args.join(",")}
];

const result = ${functionName}(...args);

console.log(JSON.stringify(result));
`;
};

 const runCode = async (
  userCode: string,
  languageId: number,
  input: string,
  expectedOutput: string,
  functionName:string
) => {
  const wrappedCode = generateWrapper(userCode, input , functionName);
  console.log("wrappedCode " , wrappedCode)
  const token = await submitCode(
    wrappedCode,
    languageId,
    expectedOutput
  );

  while (true) {
    const result = await getResult(token);

    if (result.status.id <= 2) {
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );
      continue;
    }

    return {
      verdict: result.status.description,
      stdout: result.stdout,
      stderr: result.stderr,
      compile_output: result.compile_output,
      exec_time_ms: Number(result.time) * 1000,
      memory_kb: result.memory,
    };
  }
};

 const runCodeAgainstAllTestCases = async (
  userCode: string,
  languageId: number,
  functionName:string,
  testCases: {
    input: string;
    expected_Output: string;
    is_Hidden: boolean;
  }[]
) => {
  const results = await Promise.all(
    testCases.map(async (tc) => {
      const result = await runCode(
        userCode,
        languageId,
        tc.input,
        tc.expected_Output,
        functionName
      );

      return {
        input: tc.input,
        expected: tc.expected_Output,
        actual: result.stdout,
        verdict: result.verdict,
        exec_time_ms: result.exec_time_ms,
        memory_kb: result.memory_kb,
        is_Hidden: tc.is_Hidden,
      };
    })
  );

  const allPassed = results.every(
    (r) => r.verdict === "Accepted"
  );

  return {
    verdict: allPassed ? "Accepted" : "Wrong Answer",
    testResults: results,
  };
};

export {
  runCode,
  runCodeAgainstAllTestCases,
  getResult,
  submitCode,
}