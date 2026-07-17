import 'dotenv/config'

const JUDGE0_URL = process.env.JUDGE0_API_URL!

export const LANGUAGES = {
  javascript: 63,
  python: 71,
  cpp: 54,
  java: 62,
  c: 50,
}

const submitCode = async (sourceCode: string, languageId: number, expectedOutput: string) => {
  const response = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=false`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source_code: sourceCode,
      language_id: languageId,
      expected_output: expectedOutput,
    }),
  })

  const data = await response.json()

  if (!data.token) {
    throw new Error(JSON.stringify(data))
  }

  return data.token
}

const getResult = async (token: string) => {
  const response = await fetch(`${JUDGE0_URL}/submissions/${token}?base64_encoded=false`)

  return response.json()
}

export const buildSolution = (starterCode: string, userCode: string) => {
  return starterCode.replace('{CODE}', userCode)
}

const generateWrapper = (sourceCode: string, input: string) => {
  const args = input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  return `
${sourceCode}

const args = [
${args.join(',')}
];

const result = solution(...args);

console.log(JSON.stringify(result));
`
}

const runCode = async (
  sourceCode: string,
  languageId: number,
  input: string,
  expectedOutput: string
) => {
  const wrappedCode = generateWrapper(sourceCode, input)

  const token = await submitCode(wrappedCode, languageId, expectedOutput)

  while (true) {
    const result = await getResult(token)

    if (result.status.id <= 2) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      continue
    }

    return {
      verdict: result.status.description,
      stdout: result.stdout,
      stderr: result.stderr,
      compile_output: result.compile_output,
      exec_time_ms: Number(result.time) * 1000,
      memory_kb: result.memory,
    }
  }
}

const runCodeAgainstAllTestCases = async (
  sourceCode: string,
  languageId: number,
  testCases: {
    input: string
    expected_Output: string
    is_Hidden: boolean
  }[]
) => {
  const results = await Promise.all(
    testCases.map(async (tc) => {
      const result = await runCode(sourceCode, languageId, tc.input, tc.expected_Output)

      return {
        input: tc.input,
        expected: tc.expected_Output,
        actual: result.stdout,
        verdict: result.verdict,
        exec_time_ms: result.exec_time_ms,
        memory_kb: result.memory_kb,
        is_Hidden: tc.is_Hidden,
      }
    })
  )

  const allPassed = results.every((r) => r.verdict === 'Accepted')

  return {
    verdict: allPassed ? 'Accepted' : 'Wrong Answer',
    testResults: results,
  }
}

export { submitCode, getResult, runCode, runCodeAgainstAllTestCases }
