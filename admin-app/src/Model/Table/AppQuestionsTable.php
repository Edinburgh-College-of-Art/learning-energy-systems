<?php
namespace App\Model\Table;

use App\Model\Entity\AppQuestion;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * AppQuestions Model
 *
 * @property \Cake\ORM\Association\BelongsTo $AppSchool
 */
class AppQuestionsTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->table('app_questions');
        $this->displayField('id');
        $this->primaryKey('id');

        $this->belongsTo('AppSchool', [
            'foreignKey' => 'app_school_id',
            'joinType' => 'INNER'
            ]);
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->allowEmpty('id', 'create');

        $validator
            ->requirePresence('question', 'create')
            ->notEmpty('question');

        $validator
            ->requirePresence('answer', 'create')
            ->notEmpty('answer');

        return $validator;
    }

}
