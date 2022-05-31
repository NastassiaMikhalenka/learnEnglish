import {CheckIt} from "../components/games/appGames/checkIt";
import {WriteIt} from "../components/games/appGames/writeIt";
import {PutIt} from "../components/games/appGames/putIt";
import {Sprint} from "../components/games/appGames/sprintGame/sprint";
import {Speak} from "../components/games/appGames/speakGame/speak";

export default [
    {element: CheckIt, path: 'games/game/check-it'},
    {element: WriteIt, path: 'games/game/write-it'},
    {element: PutIt, path: 'games/game/put-it'},
    {element: Sprint, path: 'games/game/sprint-it'},
    {element: Speak, path: 'games/game/speak-check-it'},
]
