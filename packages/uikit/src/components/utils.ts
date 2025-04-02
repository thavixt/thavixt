import { sleep } from "../common/utils";

export const onSubmit: (values: Record<string, string | number | FormDataEntryValue>) => Promise<void> = async (formData) => {
  console.log('Submitting...', formData);
  await sleep(1000);
  const chance = Math.random();
  const ratio = 1;
  if (chance <= ratio) {
    throw new Error(`This submission had ${ratio*100}% chance to fail - let's just try again until it works`)
  }
  console.log('Finished submitting.');
}