import axios from 'axios';
import {AssignedSlice, Portion, Preferences} from "../../types";
import {Step} from "./types";

// async function alexAviad(preferences: Preferences, cakeSize: number): Promise<{ solution: AssignedSlice[]; steps: Step[] }> {
async function alexAviad(preferences: Preferences, cakeSize: number): Promise<{ solution: Portion[]; steps: Step[] }> {
  try {
    // const response = await axios.post<{ solution: AssignedSlice[]; steps: Step[] }>('http://127.0.0.1:5000/alex_aviad', {
    const response = await axios.post<{ solution: Portion[]; steps: Step[] }>('http://127.0.0.1:5000/alex_aviad', {
      "preferences":preferences,
      "cake_size":cakeSize
    });
    console.log(response.data)
    // const allocation: AssignedSlice[] = response.data["solution"]
    const allocation: Portion[] = response.data["solution"]
    const steps: Step[] = response.data["steps"]

    return {solution: allocation, steps: steps}
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error in axios request:', error.message);
      throw new Error(`Failed to fetch from alexAviad: ${error.message}`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
}

export { alexAviad };