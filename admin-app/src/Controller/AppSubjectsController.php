<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Datasource\ConnectionManager as ConnectionManager;
use Cake\Event\Event as Event;
use Cake\I18n\Time;

/**
 * AppSubjects Controller
 *
 * @property \App\Model\Table\AppDataTable $AppData
 */
class AppSubjectsController extends AppController {
        
    private $studentId;

    public function initialize() {
        parent::initialize();
        $this->modelClass = false;
        $this->loadModel('AppData');
    }

    public function beforeFilter(Event $event) {
        parent::beforeFilter($event);
        $this->studentId = $this->request->params['app_student_id'];
    }

    public function index() {
        $dat = $this->request->query['date'];
         $this->set('subjects', $this->AppData->find()->select(['id', 'date', 'subject', 'app_students_unique_id'])->where(['date =' => $dat, 'app_students_unique_id =' => $this->studentId]));
        $this->set('_serialize', ['subjects']);
    }

    public function add() {
        $subject = $this->AppData->newEntity();

        if ($this->request->is('post')) {
            $subject = $this->AppData->patchEntity($subject, $this->request->data);
            $subject->date = new Time($this->request->data['date']);
            $subject->app_students_unique_id = $this->studentId;
            $subject->light = $subject->computer = $subject->heater = $subject->projector = 0;
            $subject->lightString = $subject->computerString = $subject->heaterString = $subject->projectorString = '000000000';

            if ($this->AppData->save($subject)) {
                $this->set(compact('subject', 'errors'));
                $this->set('_serialize', ['subject']);
            } else {
                $errors = $subject->errors();
                $this->set(compact('subject', 'errors'));
                $this->set('_serialize', ['subject', 'errors']);
            }
        }
    }

    public function edit($id = null)
    {
        $subject = $this->AppData->get($id);
        $this->set('appData', $subject);
        
        if ($this->request->is(['patch', 'post', 'put'])) {
            $subject = $this->AppData->patchEntity($subject, $this->request->data);
            if ($this->AppData->save($subject)) {
                $this->set(compact('subject', 'errors'));
                $this->set('_serialize', ['subject']);
            } else {
                $errors = $subject->errors();
                $this->set(compact('subject', 'errors'));
                $this->set('_serialize', ['subject', 'errors']);
            }
        }

        $this->set('_serialize', ['subject']);
    }

    public function delete($id = null) {
        $this->request->allowMethod(['post', 'delete']);
        $subject = $this->AppData->get($id);
        if ($this->AppData->delete($subject)) {
            $success = true;
            $message = 'Subject deleted';
        } else {
            $success = false;
            $message = 'Unable to delete';
        }
        $this->set(compact('success', 'message'));
        $this->set('_serialize', ['success', 'message']);
    }
}

?>