import { assertEquals } from "./mod.ts";

Deno.test("test one", () => {
  assertEquals(1 + 1, 2);
});
