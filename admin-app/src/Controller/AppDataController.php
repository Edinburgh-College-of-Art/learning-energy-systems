<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Datasource\ConnectionManager as ConnectionManager;
use Cake\Event\Event as Event;
use Cake\Collection\Collection;
use Cake\I18n\Time;

/**
 * AppData Controller
 *
 * @property \App\Model\Table\AppDataTable $AppData
 */
class AppDataController extends AppController
{

    /**
     * school method
     *
     * @param int|null $id school id
     * @return response
     */
    public function find_deep()
    {
        $this->layout = null;
        $school_name = $this->request->session()->read('Auth.User.school_name');
        if( strlen($school_name) < 1 ) {
            $this->response->statusCode(404);
            return $this->response;
        }

        $data = $this->AppData->find('all');
        $data->matching('AppStudents', function ($q) use ($school_name){
            return $q->where(['AppStudents.school_name' => $school_name]);
        });

        if($data->count() < 1)
        {
            $this->response->statusCode(404);
            return $this->response;
        }
        
        $this->response->body(json_encode(compact('data')));

        return $this->response;
            
     
    }

    /**
     * Index method
     *
     * @return void
     */
    public function index()
    {
        $this->set('appData', $this->paginate($this->AppData));
        $this->set('_serialize', ['appData']);
    }

    /**
     * All method
     *
     * @return void
     */
    public function all() {
        $this->set('appData', $this->AppData->find('all'));
        $this->set('_serialize', ['appData']);
    }

    public function week($date = null) {
        $studentId = $this->studentId = $this->request->params['app_student_id'];
        
        $query = $this->AppData->find()->select(['light', 'projector', 'heater', 'computer'])
            ->where(['date =' => $date,'app_students_unique_id =' => $studentId]);

        $dayT = strtotime($date);
        $monday = strtotime("last monday", $dayT);
        $friday = strtotime("next friday", $dayT);
        if (date("w", $dayT) == "1") { $monday = $dayT; }
        if (date("w", $dayT) == "5") { $friday = $dayT; }
        
        $weekQuery = $this->AppData->find()->where(['date >= ' => $monday, 'date <= ' => $friday, 'app_students_unique_id =' => $studentId])->group('date');

        $weekQuery = $weekQuery->select(['date',
            'lsum' => $query->func()->sum('light'),
            'psum' => $query->func()->sum('projector'),
            'hsum' => $query->func()->sum('heater'),
            'csum' => $query->func()->sum('computer')
        ]);

        $week = [];
        foreach ($weekQuery->toArray() as $row) {
           $week[] = [
                "daySum" => $row->lsum + $row->psum + $row->hsum + $row->csum, 
                "date" => $row->date->jsonSerialize()
            ];
        }

        $collection = new Collection($query->toArray());
        
        $week = ["day" => [
                "light" => $collection->sumOf("light"),
                "projector" => $collection->sumOf("projector"),
                "heater" => $collection->sumOf("heater"),
                "computer" => $collection->sumOf("computer")
            ], "week" => $week
        ];

        $this->set('week', $week);
        $this->set('_serialize', 'week');
    }

    /**
     * View method
     *
     * @param string|null $id App Data id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null) {
        $appData = $this->AppData->get($id, []);
        $this->set('appData', $appData);
        $this->set('_serialize', 'appData');
    }

    /**
     * Add method
     *
     * @return void Redirects on successful add, renders view otherwise.
     */
    public function add() {
        $appData = $this->AppData->newEntity();
        if ($this->request->is('post')) {
            $appData = $this->AppData->patchEntity($appData, $this->request->data);
            if ($this->AppData->save($appData)) {
                $this->Flash->success(__('The app data has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The app data could not be saved. Please, try again.'));
            }
        }
        $this->set('_serialize', ['appData']);
    }

    /**
     * Edit method
     *
     * @param string|null $id App Data id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null) {
        $appData = $this->AppData->get($id, [
            'contain' => []
        ]);
        $this->set('appData', $appData);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $appData = $this->AppData->patchEntity($appData, $this->request->data);

            if ($this->AppData->save($appData)) {
                $this->Flash->success(__('The app data has been saved.'));
                $this->set(compact('appData'));
                return $this->redirect(['action' => 'view', $id]);
            } else {
                $this->Flash->error(__('The app data could not be saved. Please, try again.'));
                $errors = $appData->errors();
                $this->set(compact('appData', 'errors'));
                $this->set('_serialize', ['appData', 'errors']);
            }
        }

        $this->set('_serialize', ['appData']);
    }

    /**
     * Delete method
     *
     * @param string|null $id App Data id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null) {
        $this->request->allowMethod(['post', 'delete']);
        $appData = $this->AppData->get($id);
        if ($this->AppData->delete($appData)) {
            $this->Flash->success(__('The app data has been deleted.'));
        } else {
            $this->Flash->error(__('The app data could not be deleted. Please, try again.'));
        }
        return $this->redirect(['action' => 'index']);
    }
}
