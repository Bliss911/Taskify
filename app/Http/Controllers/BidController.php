<?php

namespace App\Http\Controllers;

use App\Models\Bid;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BidController extends Controller
{
    public function create(Request $request)
    {

        $data = $request->all();

        $validator = Validator::make($data, [
            'bid' => 'required|integer',
            'comment' => 'required|string',
            'task' => 'required|exists:tasks,id'

        ]);
        if ($validator->fails()) {
            $status = false;
            $errors = $validator->errors();
            $message = "Task submission Failed";
            return $this->sendResult($message, [], $errors, $status);
        }


        $bid = new Bid([
            'vendor' => Auth::user()->id,
            'task' => $request->task,
            'bid' => $request->bid,
            'comment' => $request->comment

        ]);

        $bid->save();
        $task = Task::where('id', $request->task)->with(['skill', 'user', 'bids.vendor'])
            ->get();

        return $this->sendResult('bid created', $task, [], true);
    }
    public function delete(Request $request)
    {

        $data = $request->all();

        $validator = Validator::make($data, [
            'bid' => 'required|integer',
            'task' => 'required|exists:tasks,id'

        ]);
        if ($validator->fails()) {
            $status = false;
            $errors = $validator->errors();
            $message = "Task submission Failed";
            return $this->sendResult($message, [], $errors, $status);
        }



        Bid::where('id', $request->bid)->where('task', $request->task)->where('vendor', Auth::user()->id)->delete();

        $task = Task::where('id', $request->task)->with(['skill', 'user', 'bids.vendor'])
            ->get();

        return $this->sendResult('bid deleted', $task, [], true);
    }
    public function accept(Request $request)
    {

        $data = $request->all();

        $validator = Validator::make($data, [
            'bid' => 'required|integer',
            'task' => 'required|exists:tasks,id'

        ]);
        if ($validator->fails()) {
            $status = false;
            $errors = $validator->errors();
            $message = "Task submission Failed";
            return $this->sendResult($message, [], $errors, $status);
        }



        Bid::where('id', $request->bid)->update(['status' => 'ACCEPTED']);


        $task = Task::where('id', $request->task)->with(['skill', 'user', 'bids.vendor'])
            ->get();

        return $this->sendResult('bid accepted', $task, [], true);
    }
    public function reject(Request $request)
    {

        $data = $request->all();

        $validator = Validator::make($data, [
            'bid' => 'required|integer',
            'task' => 'required|exists:tasks,id'

        ]);
        if ($validator->fails()) {
            $status = false;
            $errors = $validator->errors();
            $message = "Task submission Failed";
            return $this->sendResult($message, [], $errors, $status);
        }



        Bid::where('id', $request->bid)->update(['status' => 'CANCELLED']);


        $task = Task::where('id', $request->task)->with(['skill', 'user', 'bids.vendor'])
            ->get();

        return $this->sendResult('bid rejected', $task, [], true);
    }
}
