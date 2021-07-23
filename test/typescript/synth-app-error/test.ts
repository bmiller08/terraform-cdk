/**
 * Testing synthing typescript to json
 *
 * @group typescript
 */

import { TestDriver } from "../../test-helper";

describe("full integration test synth", () => {
  let driver: TestDriver;

  beforeAll(async () => {
    driver = new TestDriver(__dirname);
    await driver.setupTypescriptProject();
  });

  test("synth prints error message on failure", async () => {
    try {
      await driver.synth();
      fail("Expected synth to fail but no error was thrown");
    } catch (e) {
      expect(e.code).toBe(1);
      console.log("TEST RECEIVED ERR", e.stderr.toString());
      console.log("jest fails with:");
      const errorString = e.stderr.toString();
      expect(errorString).toContain(
        `cdktf encountered an error while synthesizing`
      );

      expect(errorString).toContain(
        `Synth command: npm run --silent compile && node thisFileDoesNotExist.js`
      );
      expect(errorString).toContain(`Error:         non-zero exit code 1`);
    }
  });
});
